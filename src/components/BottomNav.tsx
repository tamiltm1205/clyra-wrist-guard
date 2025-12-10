import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Home, Activity, AlertTriangle, Bell, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/health", icon: Activity, label: "Health" },
  { to: "/safety", icon: AlertTriangle, label: "Safety" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card-strong border-t border-border/30 rounded-t-3xl mx-2 mb-2">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 text-muted-foreground hover:text-foreground"
              activeClassName="text-primary neon-text-purple bg-primary/10"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
