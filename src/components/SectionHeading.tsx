import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({
  index,
  title,
  description,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center px-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/50" />
        <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-amber-400">
          {`// ${index}`}
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/50" />
      </div>
      <h2 className="mt-4 text-4xl font-extralight tracking-tight text-slate-100 lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;