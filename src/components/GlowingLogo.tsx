import { cn } from "@/lib/utils";

interface GlowingLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export const GlowingLogo = ({ size = "lg", className, animate = true }: GlowingLogoProps) => {
  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-40 w-40",
    lg: "h-56 w-56",
    xl: "h-72 w-72",
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>

      
      {/* Main logo image */}
      <img 
        src="/mezzoi_logo_-removebg-preview.png"
        alt="Mezzoi Logo"
        className={cn(
          "relative z-10 object-contain rounded-full aspect-square",
          sizeClasses[size],
          animate && "animate-float"
        )}
        style={{
          filter: "brightness(0) invert(1) drop-shadow(0 0 10px hsl(270 91% 65% / 0.8)) drop-shadow(0 0 20px hsl(270 91% 65% / 0.5))",
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
