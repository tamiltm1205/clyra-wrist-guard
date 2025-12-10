import { ArrowLeft, ShieldAlert, Thermometer, Droplets, Bluetooth, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

interface Notification {
  id: string;
  type: "safety" | "health" | "device";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "health",
    title: "Hydration Reminder",
    message: "Your hydration level dropped to 65%. Consider drinking water.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "device",
    title: "Bracelet Connected",
    message: "Your CLYRA bracelet is now connected and syncing data.",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: "3",
    type: "health",
    title: "Temperature Normal",
    message: "Your skin temperature has returned to normal range.",
    time: "5 hours ago",
    isRead: true,
  },
  {
    id: "4",
    type: "safety",
    title: "Safety Check Completed",
    message: "All safety features are active and working properly.",
    time: "Yesterday",
    isRead: true,
  },
  {
    id: "5",
    type: "health",
    title: "Daily Health Report",
    message: "Your daily health metrics are ready to review.",
    time: "Yesterday",
    isRead: true,
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "safety":
        return <ShieldAlert className="w-5 h-5" />;
      case "health":
        return <Thermometer className="w-5 h-5" />;
      case "device":
        return <Bluetooth className="w-5 h-5" />;
    }
  };

  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "safety":
        return "bg-destructive/20 text-destructive";
      case "health":
        return "bg-purple-electric/20 text-purple-glow";
      case "device":
        return "bg-teal-accent/20 text-teal-glow";
    }
  };

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -right-20 w-60 h-60 bg-purple-electric/10 rounded-full blur-[80px]" />
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">Alerts & activity log</p>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {notifications.filter(n => !n.isRead).length} new
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`glass-card p-4 opacity-0 animate-fade-in transition-all duration-300 hover:neon-glow-purple ${
              !notification.isRead ? "border-primary/30" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              <div className={`p-2 rounded-xl h-fit ${getIconBg(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`font-medium ${!notification.isRead ? "text-foreground" : "text-foreground/80"}`}>
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Clear all button */}
        <button className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4">
          Clear all notifications
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
