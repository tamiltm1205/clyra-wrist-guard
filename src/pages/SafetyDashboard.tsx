import { Phone, MapPin, BellOff, AlertTriangle, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingLogo } from "@/components/GlowingLogo";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const SafetyDashboard = () => {
  const { isConnected, messages } = useWebSocket('ws://localhost:3002');
  const [isSOSActive, setIsSOSActive] = useState(false);

  const handleSOS = () => {
    setIsSOSActive(true);
    toast({
      title: "SOS Activated",
      description: "Emergency contacts notified.",
      variant: "destructive",
    });
    setTimeout(() => setIsSOSActive(false), 3000);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'SOS_TRIGGERED': return '🆘';
      case 'SILENT_SOS_TRIGGERED': return '🔇';
      default: return '🔔';
    }
  };

  return (
    <div className="min-h-screen pb-8 relative">
      <header className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-destructive" />
            <div>
              <h1 className="font-display text-2xl font-bold">Safety Center</h1>
              <p className="text-muted-foreground text-sm">Emergency Dashboard</p>
            </div>
          </div>
          <GlowingLogo size="sm" animate={false} />
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
          {messages.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {messages.length} Alert{messages.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </header>

      <main className="relative z-10 px-6 space-y-6">
        <div className="flex flex-col items-center py-8">
          <p className="text-muted-foreground text-sm mb-6 uppercase tracking-wider">
            Emergency SOS
          </p>
          
          <div className="relative">
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
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-teal-glow" />
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-destructive" />
              <p className="text-2xl font-bold">{messages.length}</p>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-purple-glow" />
              <p className="text-2xl font-bold">2m</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-sm text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid gap-3">
            <button className="glass-card p-4 flex items-center gap-4 text-left hover:neon-glow-purple">
              <div className="p-3 rounded-xl bg-purple-electric/20 text-purple-glow">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">Quick Call</h4>
                <p className="text-sm text-muted-foreground">Call emergency contact</p>
              </div>
            </button>
            <button className="glass-card p-4 flex items-center gap-4 text-left hover:neon-glow-purple">
              <div className="p-3 rounded-xl bg-teal-accent/20 text-teal-glow">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">Share Location</h4>
                <p className="text-sm text-muted-foreground">Send live location</p>
              </div>
            </button>
            <button className="glass-card p-4 flex items-center gap-4 text-left hover:neon-glow-purple">
              <div className="p-3 rounded-xl bg-purple-electric/20 text-purple-glow">
                <BellOff className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">Silent Alert</h4>
                <p className="text-sm text-muted-foreground">Discrete emergency mode</p>
              </div>
            </button>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-display text-sm text-muted-foreground uppercase tracking-wider">
              🚨 Live Alerts
            </h3>
            {messages.slice(0, 5).map((msg, index) => (
              <Card key={index} className="border-red-500 bg-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getAlertIcon(msg.type)}</span>
                    <div className="flex-1">
                      <p className="font-bold text-white">{msg.message}</p>
                      {msg.location && (
                        <p className="text-sm text-gray-300 flex items-center gap-1 mt-2">
                          <MapPin className="w-3 h-3" />
                          Lat: {msg.location.lat}, Long: {msg.location.long}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SafetyDashboard;
