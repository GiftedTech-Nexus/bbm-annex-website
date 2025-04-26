import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Import the User icon

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyResetOTP(otp);
      toast({ title: "OTP verified", description: "Set new password." });
      setStep(2);
    } catch (err: unknown) {
      toast({ 
        title: "OTP error", 
        description: err instanceof Error ? err.message : "An unknown error occurred", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.resetPassword(password, confirm);
      toast({
        title: "Password reset",
        description: "You can now login with your new password.",
      });
      navigate("/login");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast({ title: "Reset failed", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 mt-20">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-techwork-blue-dark rounded-xl shadow-lg border border-techwork-gray-light/30">
          <div className="text-center mb-8">
            {/* User icon with consistent styling */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-techwork-purple/10 flex items-center justify-center border-2 border-techwork-purple/20">
                <User className="w-8 h-8 text-techwork-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {step === 1 ? "Enter OTP" : "Set New Password"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1
                ? "We've sent an OTP to your chosen method. Enter to verify."
                : "Choose a strong new password, minimum of 6 characters."}
            </p>
          </div>

          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleOtpSubmit}>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">OTP</label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  placeholder="OTP"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-techwork-purple hover:bg-techwork-purple-dark"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">New Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="New password"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm" className="text-sm font-medium">Confirm Password</label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-techwork-purple to-techwork-blue hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Saving..." : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;