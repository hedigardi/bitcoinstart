type ImagePlaceholderProps = {
  title: string;
  hint: string;
  className?: string;
  src?: string;
  alt?: string;
};

export default function ImagePlaceholder({
  title,
  hint,
  className = "",
  src,
  alt,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-black dark:border-slate-800 dark:bg-black ${className}`}
      >
        <img
          src={src}
          alt={alt || title}
          loading="lazy"
          className="h-full w-full scale-100 object-cover opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06] group-hover:opacity-90"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-black/10" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-100/70 p-6 text-left dark:border-slate-700 dark:bg-slate-900/60 ${className}`}
      role="img"
      aria-label={`${title}. ${hint}`}
    >
      <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:bg-slate-950/70 dark:text-slate-400">
        Image Placeholder
      </div>
      <div className="mt-6 text-sm font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </div>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
        {hint}
      </p>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
        Add image file in public/images and replace this block
      </div>
    </div>
  );
}
