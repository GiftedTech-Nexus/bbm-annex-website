import { useState, useEffect, useRef } from "react";
import { User, CheckCircle, Pencil, Save, X, Camera } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { authService } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";

interface UserData {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  yearOfStudy?: string;
  semester?: string;
  role: string;
  isVerified: boolean;
  profilePic?: string;
}

interface EditData {
  phoneNumber?: string;
  whatsappNumber?: string;
  profilePic?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const DEFAULT_PROFILE_PIC = "https://www.gravatar.com/avatar/?d=mp";

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    phoneNumber: "",
    whatsappNumber: "",
    profilePic: ""
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile_pictures/${fileName}`;
    const bucketName = 'avatars';

    try {
      // Verify file size (50MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Verify file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) are allowed');
      }

      // Show uploading state
      setIsUploading(true);
      toast({
        title: "Please Wait...",
        description: "Your profile picture is being uploaded",
      });

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Storage bucket not configured. Please contact support.');
        }
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (!publicUrl) throw new Error('Failed to generate public URL');

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const user = authService.getCurrentUser();
    if (user) {
      setUserData(user);
      setEditData({
        phoneNumber: user.phoneNumber || "",
        whatsappNumber: user.whatsappNumber || "",
        profilePic: user.profilePic || DEFAULT_PROFILE_PIC
      });
    }
    setIsLoading(false);
  }, [navigate]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    // Allow editing profile picture without needing to click edit button
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    const file = e.target.files[0];
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only JPG, PNG, and WebP images are allowed",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const imageUrl = await uploadProfilePicture(file, userData?.id || '');
      
      const { success, data: updatedUser, message } = await authService.updateProfile({
        profilePic: imageUrl
      });

      if (!success) {
        throw new Error(message || "Failed to update profile");
      }

      // Update local state and localStorage
      const updatedUserData = { ...userData, profilePic: imageUrl } as UserData;
      setUserData(updatedUserData);
      setEditData(prev => ({ ...prev, profilePic: imageUrl }));
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      toast({
        title: "Success!",
        description: "Profile picture updated successfully. It might take some time to effect changes",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed";
      console.error("Upload error:", error);
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setImageLoaded(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updatePayload: Partial<EditData> = {};
      
      if (editData.phoneNumber !== userData?.phoneNumber) {
        updatePayload.phoneNumber = editData.phoneNumber || null;
      }
      
      if (editData.whatsappNumber !== userData?.whatsappNumber) {
        if (editData.whatsappNumber && !/^254\d{9}$/.test(editData.whatsappNumber)) {
          toast({
            title: "Invalid WhatsApp Number",
            description: "Must be 12 digits starting with 254 (e.g., 254712345678)",
            variant: "destructive"
          });
          return;
        }
        updatePayload.whatsappNumber = editData.whatsappNumber || null;
      }
      
      if (editData.profilePic !== userData?.profilePic && editData.profilePic !== DEFAULT_PROFILE_PIC) {
        updatePayload.profilePic = editData.profilePic || null;
      }

      if (Object.keys(updatePayload).length === 0) {
        toast({
          title: "No changes detected",
          description: "Please make changes before saving",
          variant: "default"
        });
        return;
      }

      const { success, data, message } = await authService.updateProfile(updatePayload);
      
      if (success) {
        const updatedUser = data?.user || { ...userData, ...updatePayload } as UserData;
        setUserData(updatedUser);
        setEditData({
          phoneNumber: updatedUser?.phoneNumber || '',
          whatsappNumber: updatedUser?.whatsappNumber || '',
          profilePic: updatedUser?.profilePic || DEFAULT_PROFILE_PIC
        });
        localStorage.setItem('user', JSON.stringify(updatedUser));

        toast({
          title: "Success!",
          description: message,
        });
        setIsEditing(false);
      } else {
        throw new Error(message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Update failed";
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password don't match.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await authService.updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      );
      toast({
        title: "Password updated!",
        description: "Your password has been successfully changed.",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update password";
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading profile...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const yearDisplay = userData.yearOfStudy 
    ? authService.getYearOptions().find(y => y.value === String(userData.yearOfStudy))?.label 
    : "Not set";
  
  const semesterDisplay = userData.semester 
    ? authService.getSemesterOptions().find(s => s.value === String(userData.semester))?.label 
    : "Not set";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 animate-fade-in">
            <div className="relative inline-block mx-auto mb-4 sm:mb-6">
              <div 
                className="relative cursor-pointer group hover:ring-2 hover:ring-techwork-purple"
                onClick={handleImageClick}
              >
                {editData.profilePic ? (
                  <>
                    <img
                      src={editData.profilePic}
                      alt="Profile"
                      className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-techwork-purple/20 shadow-lg hover:border-techwork-purple/50 transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PROFILE_PIC;
                        setImageLoaded(true);
                      }}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                        <User className="w-14 h-14 sm:w-20 sm:h-20 text-gray-400" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-techwork-purple/10 flex items-center justify-center border-4 border-techwork-purple/20 shadow-lg hover:border-techwork-purple/50 transition-all duration-300">
                    <User className="w-14 h-14 sm:w-20 sm:h-20 text-techwork-purple" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                disabled={isUploading}
              />
              {userData.isVerified && (
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
                </div>
              )}
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {userData.username}
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-muted-foreground">
              {userData.role === "admin" ? "Administrator" : "Student"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mx-2 sm:mx-0">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="flex items-center gap-2 w-full sm:w-auto"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-techwork-purple hover:bg-techwork-purple-dark w-full sm:w-auto"
                      size="sm"
                      disabled={isUploading}
                    >
                      <Save className="w-4 h-4" />
                      {isUploading ? "Uploading..." : "Save"}
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex items-center gap-2 w-full sm:w-auto"
                      size="sm"
                      disabled={isUploading}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {userData.username}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {userData.email}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phoneNumber"
                      value={editData.phoneNumber || ""}
                      onChange={handleEditChange}
                      className="w-full text-sm"
                      disabled={isUploading}
                    />
                  ) : (
                    <div className="p-2 rounded border border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-sm">
                      {userData.phoneNumber || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    WhatsApp Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="whatsappNumber"
                      value={editData.whatsappNumber || ""}
                      onChange={handleEditChange}
                      className="w-full text-sm"
                      disabled={isUploading}
                    />
                  ) : (
                    <div className="p-2 rounded border border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-sm">
                      {userData.whatsappNumber || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Year of Study
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {yearDisplay}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Semester
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {semesterDisplay}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Account Status
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {userData.isVerified ? "Verified" : "Not Verified"}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Role
                  </label>
                  <div className="p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                    {userData.role === "admin" ? "Administrator" : "Student"}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-700/30">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4">
                Update Password
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    className="w-full text-sm"
                    required
                    disabled={isUpdatingPassword}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full text-sm"
                    required
                    disabled={isUpdatingPassword}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full text-sm"
                    required
                    disabled={isUpdatingPassword}
                  />
                </div>
                <div className="pt-2">
                  <Button
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="w-full sm:w-auto bg-techwork-purple hover:bg-techwork-purple-dark"
                    size="sm"
                  >
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
