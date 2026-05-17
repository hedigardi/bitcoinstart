import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation("about");
  const valuePoints = t("valuePoints", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const audience = t("audience", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const whyParagraphs = t("whyParagraphs", { returnObjects: true }) as string[];
  const foundationParagraphs = t("foundationParagraphs", {
    returnObjects: true,
  }) as string[];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div id="about">
      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("whyTitle")}
            </h2>
            {/* About video */}
            <div
              className="mt-6 relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 aspect-[4/3]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <video
                ref={videoRef}
                src="/assets/about-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={hovered}
                onClick={hovered ? undefined : togglePlay}
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full object-cover cursor-pointer"
              />
              {/* Mute / unmute button — top-right, always visible */}
              <button
                onClick={toggleMute}
                aria-label={
                  muted ? t("video.unmuteLabel") : t("video.muteLabel")
                }
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/70 active:scale-95"
              >
                {muted ? (
                  <>
                    {/* Speaker with X */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                    </svg>
                    <span>{t("video.muteLabel")}</span>
                  </>
                ) : (
                  <>
                    {/* Speaker with waves */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                      <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                    </svg>
                    <span>{t("video.unmuteLabel")}</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
              {whyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://www.linkedin.com/in/hedigardi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                aria-label="Connect with Hedi on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {valuePoints.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition hover:border-orange-200 dark:hover:border-orange-900"
              >
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("audienceTitle")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("audienceDescription")}
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-sm ring-1 ring-slate-100/50 dark:ring-white/5"
              >
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm lg:p-12 relative overflow-hidden bg-white dark:bg-slate-950"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/20 rounded-full blur-2xl -mr-16 -mt-16" />
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("foundationTitle")}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
            {foundationParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
