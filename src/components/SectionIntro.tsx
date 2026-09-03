import Fade from "./Fade";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionIntro = ({
  index,
  title,
  description,
  className,
}: SectionIntroProps) => {
  return (
    <Fade className={cn("relative", className)}>
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand/60" />
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-brand">
          {`/// ${index}`}
        </span>
      </div>
      <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-slate-100 leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-slate-400 font-light leading-relaxed">
          {description}
        </p>
      )}
    </Fade>
  );
};

export default SectionIntro;