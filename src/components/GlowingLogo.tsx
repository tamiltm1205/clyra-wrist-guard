import { cn } from "@/lib/utils";

interface GlowingLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export const GlowingLogo = ({ size = "lg", className, animate = true }: GlowingLogoProps) => {
  const sizeClasses = {
    sm: "h-20 w-auto",
    md: "h-24 w-auto",
    lg: "h-36 w-auto",
    xl: "h-48 w-auto",
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
      
      {/* Main logo image */}
      <img 
        src="/Minimalist_Logo_with_Teal_and_Coral-removebg-preview.png"
        alt="Logo"
        className={cn(
          "relative z-10 object-contain",
          sizeClasses[size],
          animate && "animate-float"
        )}
        style={{
          filter: "drop-shadow(0 0 10px hsl(270 91% 65% / 0.8)) drop-shadow(0 0 20px hsl(270 91% 65% / 0.5))",
        }}
      />
      
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
