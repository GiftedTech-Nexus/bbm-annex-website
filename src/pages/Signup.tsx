import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.js";
import { User } from "lucide-react";

const yearOptions = authService.getYearOptions();
const semesterOptions = authService.getSemesterOptions();
const otpOptions = authService.getOTPMethodOptions();

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
    yearOfStudy: "1",
    semester: "1",
    otpMethod: "whatsapp",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.signup(form);
      toast({
        title: "Signup successful!",
        description: res.message || "Check your phone/email for verification OTP.",
      });
      
      const userId = res.data?.user?._id || res.data?.userId;
      if (!userId) {
        throw new Error("User ID not received from server");
      }
      
      // Store userId and otpMethod in localStorage
      localStorage.setItem("tempUserId", userId);
      localStorage.setItem("otpMethod", form.otpMethod);
      
      navigate("/verify-otp");
    } catch (err: unknown) {
      toast({
        title: "Signup failed",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 mt-10">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-techwork-blue-dark rounded-xl shadow-lg border border-techwork-gray-light/30">
          <div className="text-center mb-8">
            {/* User icon with adjustable size - you can change w-12 and h-12 to any size you want */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-techwork-purple/10 flex items-center justify-center border-2 border-techwork-purple/20">
                <User className="w-8 h-8 text-techwork-purple" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
            <p className="text-muted-foreground">Create an Account to get Started for Free.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input id="username" name="username" value={form.username} onChange={handleChange} required placeholder="your_username" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your_email@gmail.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
              <Input id="phoneNumber" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required placeholder="07xxxxxxxx" />
            </div>
            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm font-medium">WhatsApp Number</label>
              <Input id="whatsappNumber" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} required placeholder="2547xxxxxxxx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="yearOfStudy" className="text-sm font-medium">Year of Study</label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={form.yearOfStudy}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full bg-background"
                  required
                >
                  {yearOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="semester" className="text-sm font-medium">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full bg-background"
                  required
                >
                  {semesterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="otpMethod" className="text-sm font-medium">OTP Method</label>
              <select
                id="otpMethod"
                name="otpMethod"
                value={form.otpMethod}
                onChange={handleChange}
                className="border rounded-md p-2 w-full bg-background"
                required
              >
                {otpOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Test@1234" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input id="confirmPassword" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Test@1234" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-techwork-purple to-techwork-blue hover:opacity-90" disabled={loading}>
              {loading ? "Sign Up..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-techwork-purple hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;