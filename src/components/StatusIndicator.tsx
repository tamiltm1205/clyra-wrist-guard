import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface StatusIndicatorProps {
  status: "safe" | "warning" | "danger";
  className?: string;
}

export const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const config = {
    safe: {
      icon: ShieldCheck,
      label: "All Systems Normal",
      bgClass: "bg-teal-accent/20",
      borderClass: "border-teal-accent/50",
      textClass: "text-teal-glow",
      glowClass: "neon-glow-teal",
    },
    warning: {
      icon: Shield,
      label: "Attention Required",
      bgClass: "bg-yellow-500/20",
      borderClass: "border-yellow-500/50",
      textClass: "text-yellow-400",
      glowClass: "shadow-[0_0_20px_hsl(45_100%_50%/0.4)]",
    },
    danger: {
      icon: ShieldAlert,
      label: "Alert Active",
      bgClass: "bg-destructive/20",
      borderClass: "border-destructive/50",
      textClass: "text-destructive",
      glowClass: "shadow-[0_0_20px_hsl(0_84%_60%/0.5)]",
    },
  };

  const { icon: Icon, label, bgClass, borderClass, textClass, glowClass } = config[status];

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
        bgClass,
        borderClass,
        glowClass,
        className
      )}
    >
      <div className="relative">
        <Icon className={cn("w-6 h-6", textClass)} />
        {status === "safe" && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-accent rounded-full animate-pulse" />
        )}
        {status === "danger" && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
        )}
      </div>
      <span className={cn("font-medium text-sm", textClass)}>{label}</span>
    </div>
  );
};
