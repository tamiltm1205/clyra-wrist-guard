import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HealthCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  className?: string;
  delay?: number;
}

export const HealthCard = ({
  icon: Icon,
  title,
  value,
  unit,
  status = "normal",
  className,
  delay = 0,
}: HealthCardProps) => {
  const statusColors = {
    normal: "text-teal-glow",
    warning: "text-yellow-400",
    critical: "text-destructive",
  };

  const statusGlow = {
    normal: "neon-glow-teal",
    warning: "shadow-[0_0_20px_hsl(45_100%_50%/0.3)]",
    critical: "shadow-[0_0_20px_hsl(0_84%_60%/0.4)]",
  };

  return (
    <div
      className={cn(
        "glass-card p-5 opacity-0 animate-fade-in-up",
        statusGlow[status],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg bg-muted/50", statusColors[status])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
        {title}
      </p>
      
      <div className="flex items-baseline gap-1">
        <span className={cn("font-display text-3xl font-bold", statusColors[status])}>
          {value}
        </span>
        {unit && (
          <span className="text-muted-foreground text-sm">{unit}</span>
        )}
      </div>
    </div>
  );
};
