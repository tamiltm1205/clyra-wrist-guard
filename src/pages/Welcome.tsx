import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlowingLogo } from "@/components/GlowingLogo";
import StarBorder from "@/components/StarBorder";
import { Watch, ChevronRight, Shield, User } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <GlowingLogo size="xl" />
        </div>

        {/* Tagline */}
        <p className="text-lg text-muted-foreground mb-2 opacity-0 animate-fade-in delay-200">
          Your Safety
        </p>
        <p className="text-xl font-medium text-foreground mb-12 opacity-0 animate-fade-in delay-300">
          Your Health at Your <span className="gradient-text">Wrist</span>
        </p>

        {/* Bracelet icon */}
        <div className="mb-12 opacity-0 animate-scale-in delay-500">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-electric to-teal-accent rounded-full blur-xl opacity-50 animate-pulse-glow" />
            <div className="relative glass-card p-6 rounded-full">
              <Watch className="w-12 h-12 text-foreground" />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="w-full space-y-6 opacity-0 animate-fade-in-up delay-500">
          <div className="space-y-3">

            <p className="text-sm text-muted-foreground uppercase tracking-wider">Choose Dashboard</p>
            
            <StarBorder 
              as="button" 
              className="w-full" 
              color="cyan" 
              speed="5s"
              onClick={() => navigate("/login")}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                User Dashboard
                <ChevronRight className="w-5 h-5" />
              </div>
            </StarBorder>

            <StarBorder 
              as="button" 
              className="w-full" 
              color="red" 
              speed="5s"
              onClick={() => navigate("/safety-login")}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Center
                <ChevronRight className="w-5 h-5" />
              </div>
            </StarBorder>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-electric animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-teal-accent animate-pulse delay-100" />
          <span className="w-2 h-2 rounded-full bg-purple-electric animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;