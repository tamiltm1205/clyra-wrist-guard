import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowingLogo } from "@/components/GlowingLogo";
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";

const SafetyLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/safety-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="relative z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <GlowingLogo size="md" animate={false} />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-destructive" />
          <h2 className="font-display text-2xl font-bold">Safety Center</h2>
        </div>
        
        <p className="text-muted-foreground text-sm mb-8 text-center">
          Sign in to access Safety Dashboard
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button variant="sos" size="lg" className="w-full mt-6" type="submit">
            Sign In to Safety Center
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SafetyLogin;
