import { User, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

export const ProfileCard = ({ 
  name = "Sarah Johnson", 
  email = "sarah.johnson@email.com",
  avatarUrl,
  onLogout 
}: ProfileCardProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Profile Info */}
      <button className="w-full p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-muted/30 border-b border-border/30">
        {/* Avatar */}
        <div className="relative">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-electric/50"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-electric to-teal-accent flex items-center justify-center ring-2 ring-purple-electric/50">
              <User className="w-7 h-7 text-foreground" />
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-teal-accent rounded-full border-2 border-background" />
        </div>

        {/* User details */}
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-lg text-foreground truncate">{name}</p>
          <p className="text-sm text-muted-foreground truncate">{email}</p>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </button>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full p-4 flex items-center gap-4 text-left transition-all duration-300 hover:bg-destructive/10"
      >
        <div className="p-2 rounded-xl bg-destructive/20 text-destructive">
          <LogOut className="w-5 h-5" />
        </div>
        <p className="font-medium text-destructive">Sign Out</p>
      </button>
    </div>
  );
};
