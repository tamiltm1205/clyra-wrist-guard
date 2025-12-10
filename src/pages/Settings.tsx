import { ArrowLeft, Bluetooth, Thermometer, Droplets, Users, Bell, Shield, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/BottomNav";
import { ProfileCard } from "@/components/ProfileCard";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [autoSOS, setAutoSOS] = useState(true);

  const settingsGroups = [
    {
      title: "Device",
      items: [
        {
          icon: Bluetooth,
          label: "Bracelet Connection",
          value: "Connected",
          color: "teal",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Health Thresholds",
      items: [
        {
          icon: Thermometer,
          label: "Temperature Alert",
          value: "38.0°C",
          color: "purple",
          hasArrow: true,
        },
        {
          icon: Droplets,
          label: "Hydration Warning",
          value: "Below 50%",
          color: "teal",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Emergency",
      items: [
        {
          icon: Users,
          label: "Emergency Contacts",
          value: "3 contacts",
          color: "purple",
          hasArrow: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-purple-electric/10 rounded-full blur-[80px]" />
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
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your experience</p>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 space-y-6">
        {/* Profile Section */}
        <div className="opacity-0 animate-fade-in">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
            Account
          </h3>
          <ProfileCard />
        </div>
        {settingsGroups.map((group, groupIndex) => (
          <div
            key={group.title}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${groupIndex * 100}ms` }}
          >
            <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
              {group.title}
            </h3>
            <div className="glass-card overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-muted/30 ${
                    index !== group.items.length - 1 ? "border-b border-border/30" : ""
                  }`}
                >
                  <div className={`p-2 rounded-xl ${
                    item.color === "purple" 
                      ? "bg-purple-electric/20 text-purple-glow" 
                      : "bg-teal-accent/20 text-teal-glow"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Toggle settings */}
        <div className="opacity-0 animate-fade-in delay-300">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground mb-3">
            Preferences
          </h3>
          <div className="glass-card overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border/30">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-purple-electric/20 text-purple-glow">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive health alerts</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-destructive/20 text-destructive">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Auto SOS</p>
                  <p className="text-sm text-muted-foreground">Detect falls & emergencies</p>
                </div>
              </div>
              <Switch checked={autoSOS} onCheckedChange={setAutoSOS} />
            </div>
          </div>
        </div>

        {/* App info */}
        <div className="text-center pt-4 opacity-0 animate-fade-in delay-500">
          <p className="text-muted-foreground text-sm">CLYRA v1.0.0</p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Your Safety. Your Health. At Your Wrist.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
