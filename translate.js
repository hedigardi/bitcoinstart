import fs from "fs/promises";
import path from "path";
import axios from "axios";
import translateApi from "@vitalets/google-translate-api";

const localesDir = path.join(process.cwd(), "public", "locales");
const sourceLang = "en";
const targetLangs = ["no", "sv", "da"];

function maskPlaceholders(text) {
  const placeholders = [...text.matchAll(/{{\s*[\w]+\s*}}/g)];
  let masked = text;
  placeholders.forEach((match, index) => {
    masked = masked.replace(match[0], `___I18N_PLACEHOLDER_${index}___`);
  });
  return {
    masked,
    replacements: placeholders.map((match, index) => ({
      token: `___I18N_PLACEHOLDER_${index}___`,
      original: match[0],
    })),
  };
}

function restorePlaceholders(text, replacements) {
  let restored = text;
  replacements.forEach(({ token, original }) => {
    restored = restored.replace(new RegExp(token, "g"), original);
  });
  return restored;
}

function collectStrings(obj, path = [], entries = []) {
  if (typeof obj === "string") {
    entries.push({ path, value: obj });
    return entries;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) =>
      collectStrings(item, [...path, index], entries),
    );
    return entries;
  }

  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      collectStrings(obj[key], [...path, key], entries);
    }
  }

  return entries;
}

function setValueAtPath(obj, path, value) {
  let current = obj;
  path.forEach((segment, index) => {
    if (index === path.length - 1) {
      current[segment] = value;
    } else {
      current = current[segment];
    }
  });
}

async function translateViaMyMemory(text, from, to) {
  const url =
    process.env.LIBRE_TRANSLATE_URL ||
    "https://api.mymemory.translated.net/get";
  const response = await axios.get(url, {
    params: {
      q: text,
      langpair: `${from}|${to}`,
    },
    headers: {
      Accept: "application/json",
    },
  });

  const translated = response.data?.responseData?.translatedText;
  if (typeof translated !== "string") {
    throw new Error("MyMemory returned no translation");
  }

  return translated;
}

async function translateText(text, from, to) {
  if (!text.trim()) return text;

  const { masked, replacements } = maskPlaceholders(text);

  try {
    const translated = await translateViaMyMemory(masked, from, to);
    return restorePlaceholders(translated, replacements);
  } catch (error) {
    console.warn(
      "MyMemory translation failed, falling back to Google:",
      error?.message ?? error,
    );
    try {
      const result = await translateApi.translate(masked, { from, to });
      return restorePlaceholders(result.text, replacements);
    } catch (fallbackError) {
      console.error(
        "Google translation fallback also failed:",
        fallbackError?.message ?? fallbackError,
      );
      return text;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateBatch(strings, from, to) {
  if (!strings.length) return [];

  const results = [];
  for (const text of strings) {
    results.push(await translateText(text, from, to));
    await sleep(1000);
  }
  return results;
}

async function translateFileObject(obj, from, to) {
  const entries = collectStrings(obj);
  if (!entries.length) return obj;

  const translatedStrings = await translateBatch(
    entries.map((entry) => entry.value),
    from,
    to,
  );

  const output = JSON.parse(JSON.stringify(obj));
  entries.forEach((entry, index) => {
    setValueAtPath(output, entry.path, translatedStrings[index]);
  });

  return output;
}

async function translate() {
  const enDir = path.join(localesDir, sourceLang);
  const files = await fs.readdir(enDir);

  for (const lang of targetLangs) {
    const langDir = path.join(localesDir, lang);
    await fs.mkdir(langDir, { recursive: true });

    for (const file of files) {
      if (!file.endsWith(".json")) continue;

      const enFile = path.join(enDir, file);
      const content = await fs.readFile(enFile, "utf8");
      const obj = JSON.parse(content);

      console.log(`Translating ${file} to ${lang}...`);
      const translated = await translateFileObject(obj, sourceLang, lang);

      const langFile = path.join(langDir, file);
      await fs.writeFile(langFile, JSON.stringify(translated, null, 2));
      console.log(`Saved ${langFile}`);
    }
  }
}

translate().catch(console.error);
