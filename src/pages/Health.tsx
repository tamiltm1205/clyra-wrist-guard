import { ArrowLeft, Thermometer, Droplets, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NeonChart } from "@/components/NeonChart";
import { CircularProgress } from "@/components/CircularProgress";
import { BottomNav } from "@/components/BottomNav";

const Health = () => {
  const navigate = useNavigate();

  // Mock temperature data
  const temperatureData = [
    { time: "6AM", value: 36.2 },
    { time: "9AM", value: 36.5 },
    { time: "12PM", value: 36.8 },
    { time: "3PM", value: 37.0 },
    { time: "6PM", value: 36.9 },
    { time: "9PM", value: 36.6 },
    { time: "Now", value: 36.8 },
  ];

  // Mock hydration data
  const hydrationData = [
    { time: "6AM", value: 45 },
    { time: "9AM", value: 52 },
    { time: "12PM", value: 68 },
    { time: "3PM", value: 75 },
    { time: "6PM", value: 70 },
    { time: "9PM", value: 72 },
    { time: "Now", value: 72 },
  ];

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-20 w-60 h-60 bg-purple-electric/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-60 -left-20 w-60 h-60 bg-teal-accent/15 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="font-display text-3xl font-bold">Health Monitor</h1>
        <p className="text-muted-foreground mt-1">Real-time vitals tracking</p>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 space-y-6">
        {/* Temperature Section */}
        <div className="glass-card p-5 opacity-0 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-electric/20">
                <Thermometer className="w-5 h-5 text-purple-glow" />
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Skin Temperature
                </h3>
                <p className="font-display text-2xl font-bold text-purple-glow">
                  36.8°C
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-teal-glow bg-teal-accent/20 px-2 py-1 rounded-full">
                Normal
              </span>
            </div>
          </div>
          
          <NeonChart data={temperatureData} color="purple" height={150} />
          
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>Alert threshold: 38.0°C</span>
          </div>
        </div>

        {/* Hydration Section */}
        <div className="glass-card p-5 opacity-0 animate-fade-in delay-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-accent/20">
                <Droplets className="w-5 h-5 text-teal-glow" />
              </div>
              <div>
                <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Hydration Level
                </h3>
                <p className="font-display text-2xl font-bold text-teal-glow">
                  72%
                </p>
              </div>
            </div>
            <CircularProgress
              value={72}
              size={60}
              strokeWidth={6}
              colorClass="teal"
              showValue={false}
            />
          </div>
          
          <NeonChart data={hydrationData} color="teal" height={150} />
          
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>Recommended: Stay above 60%</span>
          </div>
        </div>

        {/* Health Tips */}
        <div className="glass-card p-5 opacity-0 animate-fade-in-up delay-200">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Health Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
              <div className="w-2 h-2 rounded-full bg-teal-accent mt-2" />
              <p className="text-sm text-foreground/80">
                Your hydration levels are optimal. Keep it up!
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
              <div className="w-2 h-2 rounded-full bg-purple-electric mt-2" />
              <p className="text-sm text-foreground/80">
                Temperature has been stable throughout the day.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Health;
