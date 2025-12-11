import { useState } from "react";
import { ArrowLeft, Phone, MapPin, BellOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "@/hooks/use-toast";

const Safety = () => {
  const navigate = useNavigate();
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOS = () => {
    setIsSOSActive(true);
    toast({
      title: "SOS Activated",
      description: "Emergency contacts have been notified.",
      variant: "destructive",
    });
    
    // Reset after 3 seconds for demo
    setTimeout(() => setIsSOSActive(false), 3000);
  };

  const quickActions = [
    {
      icon: Phone,
      label: "Quick Call",
      description: "Call emergency contact",
      color: "purple",
    },
    {
      icon: MapPin,
      label: "Share Location",
      description: "Send live location",
      color: "teal",
    },
    {
      icon: BellOff,
      label: "Silent Alert",
      description: "Discrete emergency mode",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="font-display text-3xl font-bold">Safety Center</h1>
        <p className="text-muted-foreground mt-1">Emergency assistance & alerts</p>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 space-y-8">
        {/* SOS Button */}
        <div className="flex flex-col items-center py-8 opacity-0 animate-scale-in">
          <p className="text-muted-foreground text-sm mb-6 uppercase tracking-wider">
            Press for Emergency
          </p>
          
          <div className="relative">
            {/* Pulse rings */}
            {isSOSActive && (
              <>
                <div className="absolute inset-0 rounded-full bg-destructive/30 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse-ring delay-300" />
              </>
            )}
            
            <Button
              variant="sos"
              size="icon-xl"
              className="w-40 h-40 rounded-full text-2xl font-display font-bold relative z-10"
              onClick={handleSOS}
            >
              <div className="flex flex-col items-center">
                <AlertTriangle className="w-10 h-10 mb-2" />
                <span>SOS</span>
              </div>
            </Button>
          </div>
          
          <p className="text-destructive/80 text-xs mt-6 text-center max-w-xs">
            This will alert your emergency contacts and share your location
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h3>
          
          <div className="grid gap-3">
            {quickActions.map((action, index) => (
              <button
                key={action.label}
                className="glass-card p-4 flex items-center gap-4 text-left transition-all duration-300 hover:neon-glow-purple group"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className={`p-3 rounded-xl ${
                  action.color === "purple" 
                    ? "bg-purple-electric/20 text-purple-glow" 
                    : "bg-teal-accent/20 text-teal-glow"
                }`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="glass-card p-5 opacity-0 animate-fade-in-up delay-500">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Your Location
          </h3>
          <div className="relative h-48 rounded-xl overflow-hidden bg-muted/50">
            {/* Mock map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-accent/30 rounded-full animate-pulse-ring" />
                <div className="w-4 h-4 bg-teal-accent rounded-full relative z-10" />
              </div>
            </div>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(222 47% 20%) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(222 47% 20%) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="glass-card-strong p-2 rounded-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-glow" />
                <span className="text-xs">123 Main Street, City</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Safety;
