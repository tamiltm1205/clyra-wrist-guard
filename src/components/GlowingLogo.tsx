import { cn } from "@/lib/utils";

interface GlowingLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export const GlowingLogo = ({ size = "lg", className, animate = true }: GlowingLogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* Glow effect behind */}
      <div 
        className={cn(
          "absolute inset-0 blur-3xl opacity-60",
          animate && "animate-glow-pulse"
        )}
        style={{
          background: "linear-gradient(135deg, hsl(270 91% 65% / 0.5) 0%, hsl(174 72% 56% / 0.5) 100%)",
        }}
      />
      
      {/* Main logo text */}
      <h1 
        className={cn(
          "font-display font-black tracking-wider relative z-10",
          sizeClasses[size],
          animate && "animate-float"
        )}
      >
        <span className="gradient-text neon-text-purple">MEZZOI</span>
      </h1>
      
      {/* Decorative ring */}
      <div 
        className={cn(
          "absolute -inset-4 rounded-full border border-primary/20",
          animate && "animate-pulse-ring"
        )}
      />
      <div 
        className={cn(
          "absolute -inset-8 rounded-full border border-secondary/10",
          animate && "animate-pulse-ring delay-300"
        )}
      />
    </div>
  );
};
