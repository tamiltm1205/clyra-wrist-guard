import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlowingLogo } from "@/components/GlowingLogo";
import { Watch, ChevronRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-electric/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-accent/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-electric/10 via-transparent to-transparent rounded-full" />
      </div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(270 91% 65% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(270 91% 65% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <GlowingLogo size="xl" />
        </div>

        {/* Tagline */}
        <p className="text-lg text-muted-foreground mb-2 opacity-0 animate-fade-in delay-200">
          Your Safety. Your Health.
        </p>
        <p className="text-xl font-medium text-foreground mb-12 opacity-0 animate-fade-in delay-300">
          At Your <span className="gradient-text">Wrist</span>.
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
        <div className="w-full space-y-4 opacity-0 animate-fade-in-up delay-500">
          <Button
            variant="glow"
            size="xl"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button
            variant="glass"
            size="lg"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </Button>
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
