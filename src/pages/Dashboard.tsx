import { Thermometer, Droplets, Bluetooth, Battery, AlertTriangle, MapPin, Volume2, VolumeX } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";
import { StatusIndicator } from "@/components/StatusIndicator";
import { HealthCard } from "@/components/HealthCard";
import { BottomNav } from "@/components/BottomNav";
import { GlowingLogo } from "@/components/GlowingLogo";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { isConnected: wsConnected, messages } = useWebSocket('ws://localhost:3002');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastAlertTime, setLastAlertTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock data
  const healthData = {
    temperature: 36.8,
    hydration: 72,
    batteryLevel: 85,
    isConnected: wsConnected,
    status: messages.some(msg => msg.type.includes('SOS')) ? "alert" as const : "safe" as const,
  };

  // Play alert sound
  const playAlertSound = (type: string) => {
    if (!soundEnabled) return;
    
    try {
      const audio = new Audio();
      if (type === 'SOS_TRIGGERED') {
        // High priority alert sound
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      } else {
        // Standard notification sound
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      }
      audio.play().catch(() => {});
    } catch (error) {
      // Ignore audio errors
    }
  };

  // Handle new messages
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[0];
      if (latestMessage.timestamp !== lastAlertTime) {
        setLastAlertTime(latestMessage.timestamp);
        playAlertSound(latestMessage.type);
        
        // Show toast notification
        toast({
          title: getAlertTitle(latestMessage.type),
          description: latestMessage.message,
          variant: latestMessage.type.includes('SOS') ? 'destructive' : 'default',
          duration: 5000,
        });
      }
    }
  }, [messages, lastAlertTime, soundEnabled, toast]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'SOS_TRIGGERED': return '🆘';
      case 'SILENT_SOS_TRIGGERED': return '🔇';
      case 'CUSTOM_NOTIFICATION': return '📢';
      case 'LOCATION_UPDATED': return '📍';
      default: return '🔔';
    }
  };

  const getAlertTitle = (type: string) => {
    switch (type) {
      case 'SOS_TRIGGERED': return '🆘 EMERGENCY SOS ALERT';
      case 'SILENT_SOS_TRIGGERED': return '🔇 Silent SOS Alert';
      case 'CUSTOM_NOTIFICATION': return '📢 Admin Notification';
      case 'LOCATION_UPDATED': return '📍 Location Update';
      default: return '🔔 Alert';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'SOS_TRIGGERED': return 'bg-red-500/20 border-red-500 shadow-red-500/20';
      case 'SILENT_SOS_TRIGGERED': return 'bg-orange-500/20 border-orange-500 shadow-orange-500/20';
      case 'CUSTOM_NOTIFICATION': return 'bg-blue-500/20 border-blue-500 shadow-blue-500/20';
      case 'LOCATION_UPDATED': return 'bg-green-500/20 border-green-500 shadow-green-500/20';
      default: return 'bg-gray-500/20 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen pb-24 relative">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="glass-card px-3 py-2 rounded-full h-auto"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-glow" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
            <span className="text-xs ml-1">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </Button>
          {messages.length > 0 && (
            <Badge variant="destructive" className="animate-pulse shadow-lg">
              {messages.length} Alert{messages.length > 1 ? 's' : ''}
            </Badge>
          )}
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

        {/* Live Alerts */}
        {messages.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm text-muted-foreground uppercase tracking-wider">
                🚨 Live Alerts ({messages.length})
              </h3>
              {messages.some(msg => msg.type.includes('SOS')) && (
                <Badge variant="destructive" className="animate-bounce">
                  EMERGENCY
                </Badge>
              )}
            </div>
            {messages.slice(0, 5).map((msg, index) => (
              <Card key={index} className={`${getAlertColor(msg.type)} border shadow-lg ${msg.type.includes('SOS') ? 'animate-pulse' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">{getAlertIcon(msg.type)}</span>
                      {msg.type.includes('SOS') && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping mt-1"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-sm mb-1">{getAlertTitle(msg.type)}</p>
                      <p className="font-medium text-white">{msg.message}</p>
                      {msg.location && (
                        <p className="text-sm text-gray-300 flex items-center gap-1 mt-2 bg-black/20 px-2 py-1 rounded">
                          <MapPin className="w-3 h-3" />
                          Lat: {msg.location.lat}, Long: {msg.location.long}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        🕰️ {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {messages.length > 5 && (
              <p className="text-center text-xs text-muted-foreground">
                +{messages.length - 5} more alerts...
              </p>
            )}
          </div>
        )}

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
              <p className="font-display text-xl font-bold gradient-text">{messages.length}</p>
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
