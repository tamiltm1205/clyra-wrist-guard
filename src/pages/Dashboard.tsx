import { Thermometer, Droplets, Bluetooth, Battery } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";
import { StatusIndicator } from "@/components/StatusIndicator";
import { HealthCard } from "@/components/HealthCard";
import { BottomNav } from "@/components/BottomNav";
import { GlowingLogo } from "@/components/GlowingLogo";

const Dashboard = () => {
  // Mock data
  const healthData = {
    temperature: 36.8,
    hydration: 72,
    batteryLevel: 85,
    isConnected: true,
    status: "safe" as const,
  };

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-60 h-60 bg-purple-electric/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-teal-accent/15 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Good Morning</p>
            <h1 className="font-display text-2xl font-bold">Sarah</h1>
          </div>
          <GlowingLogo size="sm" animate={false} />
        </div>

        {/* Connection status */}
        <div className="flex items-center gap-3 opacity-0 animate-fade-in">
          <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-full">
            <Bluetooth className={`w-4 h-4 ${healthData.isConnected ? "text-teal-glow" : "text-muted-foreground"}`} />
            <span className="text-xs">
              {healthData.isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-full">
            <Battery className="w-4 h-4 text-teal-glow" />
            <span className="text-xs">{healthData.batteryLevel}%</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 space-y-6">
        {/* Status indicator */}
        <div className="opacity-0 animate-fade-in delay-100">
          <StatusIndicator status={healthData.status} className="w-full" />
        </div>

        {/* Main health dial */}
        <div className="glass-card p-6 opacity-0 animate-scale-in delay-200">
          <h3 className="font-display text-sm text-muted-foreground mb-4 text-center uppercase tracking-wider">
            Overall Health Score
          </h3>
          <div className="flex justify-center">
            <CircularProgress
              value={86}
              size={180}
              strokeWidth={12}
              label="Excellent"
            />
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Your vitals are within optimal range
          </p>
        </div>

        {/* Health metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          <HealthCard
            icon={Thermometer}
            title="Skin Temperature"
            value={healthData.temperature}
            unit="°C"
            status="normal"
            delay={300}
          />
          <HealthCard
            icon={Droplets}
            title="Hydration Level"
            value={healthData.hydration}
            unit="%"
            status="normal"
            delay={400}
          />
        </div>

        {/* Quick Stats */}
        <div className="glass-card p-5 opacity-0 animate-fade-in-up delay-500">
          <h3 className="font-display text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            Today's Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-display text-xl font-bold gradient-text">8</p>
              <p className="text-xs text-muted-foreground">Hours Active</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold gradient-text">2.4L</p>
              <p className="text-xs text-muted-foreground">Water Intake</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold gradient-text">0</p>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
