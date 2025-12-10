import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowingLogo } from "@/components/GlowingLogo";
import { Eye, EyeOff, Watch, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden px-6 py-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-32 w-80 h-80 bg-purple-electric/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-teal-accent/20 rounded-full blur-[100px]" />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="relative z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="mb-8">
          <GlowingLogo size="md" animate={false} />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold mb-2 opacity-0 animate-fade-in">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground text-sm mb-8 opacity-0 animate-fade-in delay-100">
          {isSignUp
            ? "Start your health journey with CLYRA"
            : "Sign in to access your health dashboard"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 opacity-0 animate-fade-in-up delay-200">
          {isSignUp && (
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                className="w-full"
              />
            </div>
          )}

          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

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

          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <Button variant="glow" size="lg" className="w-full mt-6" type="submit">
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6 w-full opacity-0 animate-fade-in delay-300">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Connect Bracelet */}
        <Button
          variant="glass"
          size="lg"
          className="w-full opacity-0 animate-fade-in delay-300"
          onClick={() => navigate("/dashboard")}
        >
          <Watch className="w-5 h-5 mr-2" />
          Connect Bracelet
        </Button>

        {/* Toggle Sign In/Sign Up */}
        <p className="text-muted-foreground text-sm mt-8 opacity-0 animate-fade-in delay-500">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline font-medium"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
