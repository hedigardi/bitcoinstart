import axios from "axios";

async function test() {
  try {
    const response = await axios.post("https://libretranslate.com/translate", {
      q: "Hello world",
      source: "en",
      target: "no",
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
}

test();
