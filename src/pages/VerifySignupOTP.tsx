import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/auth";
import { User } from "lucide-react";

const VerifySignupOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Get userId and otpMethod from localStorage with proper null checks
  const userId = localStorage.getItem("tempUserId") ?? "";
  const otpMethod = localStorage.getItem("otpMethod") || "whatsapp";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return;
    }

    if (!token && !userId) {
      toast({
        title: "Account Verified",
        description: "You can log in now.",
       // variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, userId]);

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tempUserId");
    localStorage.removeItem("otpMethod");
    localStorage.removeItem("user"); // Remove any other user data
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !otp) {
      toast({
        title: "Verification Error",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await authService.verifyOTP(userId, otp);
      
      setIsVerified(true);
      toast({
        title: "Verified successfully!",
        description: "Your account has been verified. Please login.",
      });
  
      // Clear all authentication data
      clearAuthData();

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Verification failed",
        description: error?.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }

    setResendLoading(true);
    try {
      const res = await authService.resendOTP(userId, otpMethod);
      toast({
        title: "OTP resent!",
        description: res.message || "Check your phone/email for the new OTP.",
      });
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Resend failed",
        description: error?.message || "Failed to resend OTP",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 mt-10">
          <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-techwork-blue-dark rounded-xl shadow-lg border border-techwork-gray-light/30 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Verified Successfully!</h1>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 mt-10">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-techwork-blue-dark rounded-xl shadow-lg border border-techwork-gray-light/30">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-techwork-purple/10 flex items-center justify-center border-2 border-techwork-purple/20">
                <User className="w-8 h-8 text-techwork-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
            <p className="text-muted-foreground">
              Enter the verification code sent to your {otpMethod === "email" ? "email" : "whatsapp/email"}
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleVerify}>
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                placeholder="Enter 6-digit code"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-techwork-purple to-techwork-blue hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p>
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-techwork-purple hover:underline"
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifySignupOTP;