import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  colorClass?: "purple" | "teal" | "gradient";
  showValue?: boolean;
  label?: string;
  unit?: string;
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  colorClass = "gradient",
  showValue = true,
  label,
  unit = "%",
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(Math.max(value, 0), max);
  const offset = circumference - (progress / max) * circumference;

  const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`;

  const getStrokeColor = () => {
    if (colorClass === "purple") return "hsl(270 91% 65%)";
    if (colorClass === "teal") return "hsl(174 72% 40%)";
    return `url(#${gradientId})`;
  };

  return (
    <div className={cn("circular-progress", className)}>
      <svg width={size} height={size} className="drop-shadow-lg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 91% 65%)" />
            <stop offset="100%" stopColor="hsl(174 72% 56%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(222 47% 14%)"
          strokeWidth={strokeWidth}
          className="opacity-50"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
          filter="url(#glow)"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold gradient-text">
            {Math.round(progress)}
            <span className="text-sm">{unit}</span>
          </span>
          {label && (
            <span className="text-xs text-muted-foreground mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};
