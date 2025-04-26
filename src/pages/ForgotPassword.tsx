import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/auth";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";

const otpOptions = authService.getOTPMethodOptions();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpMethod, setOtpMethod] = useState("whatsapp");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email, otpMethod);
      toast({
        title: "OTP sent!",
        description: `Check your ${otpMethod === "whatsapp" ? "WhatsApp" : "email"} for OTP.`,
      });
      navigate("/reset-password");
    } catch (err: unknown) {
      toast({
        title: "Request failed",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 mt-16">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-techwork-blue-dark rounded-xl shadow-lg border border-techwork-gray-light/30">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-techwork-purple/10 flex items-center justify-center border-2 border-techwork-purple/20">
                <User className="w-8 h-8 text-techwork-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              Enter your email and choose a method to receive an OTP to reset password.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Your registered email"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="otpMethod" className="text-sm font-medium">OTP Method</label>
              <select
                id="otpMethod"
                value={otpMethod}
                onChange={e => setOtpMethod(e.target.value)}
                className="border rounded-md p-2 w-full bg-background"
                required
              >
                {otpOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-techwork-purple hover:bg-techwork-purple-dark"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Remembered your password? </span>
            <Link to="/login" className="text-techwork-purple hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;