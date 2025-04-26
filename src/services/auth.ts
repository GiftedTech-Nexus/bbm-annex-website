import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/auth`,  
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

const validateWhatsAppNumber = (number) => {
  if (!number) return false;
  return number.startsWith('254') && number.length === 12 && /^\d+$/.test(number);
};

const normalizeResponse = (response) => {
  return {
    success: true,
    ...response.data
  };
};

export const authService = {
  setResetEmail: (email) => localStorage.setItem('resetEmail', email),
  getResetEmail: () => localStorage.getItem('resetEmail'),
  clearResetEmail: () => localStorage.removeItem('resetEmail'),
  setResetOTPMethod: (method) => localStorage.setItem('resetOTPMethod', method),
  getResetOTPMethod: () => localStorage.getItem('resetOTPMethod'),
  clearResetOTPMethod: () => localStorage.removeItem('resetOTPMethod'),

  signup: async (userData) => {
    if (!validateWhatsAppNumber(userData.whatsappNumber)) {
      throw new Error('WhatsApp number must start with country code 254 (e.g., 2547XXXXXXXX)');
    }
    const payload = {
      ...userData,
      yearOfStudy: String(userData.yearOfStudy),
      semester: String(userData.semester),
      otpMethod: userData.otpMethod || 'whatsapp'
    };
    const response = await api.post('/signup', payload);
    return normalizeResponse(response);
  },

  verifyOTP: async (userId, otp) => {
    const response = await api.post('/verify-otp', { userId, otp });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return normalizeResponse(response);
  },

  resendOTP: async (userId, otpMethod = 'whatsapp') => {
    const response = await api.post('/resend-otp', { userId, otpMethod });
    return normalizeResponse(response);
  },

  login: async (identifier, password) => {
    const isEmail = identifier.includes('@');
    const payload = isEmail
      ? { email: identifier, password }
      : { username: identifier, password };
    const response = await api.post('/login', payload);
    if (response.data.token && response.data.data?.user) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return normalizeResponse(response);
  },

  forgotPassword: async (email, otpMethod) => {
    const response = await api.post('/forgotPassword', { email, otpMethod });
    authService.setResetEmail(email);
    authService.setResetOTPMethod(otpMethod);
    return {
      status: response.data.status || 'success',
      ...response.data
    };
  },

  verifyResetOTP: async (otp) => {
    const email = authService.getResetEmail();
    if (!email) throw new Error('Session expired. Please start over.');
    const response = await api.post('/verifyResetOTP', { email, otp });
    if (!response.data.resetToken) {
      throw new Error('Invalid response from server');
    }
    localStorage.setItem('resetToken', response.data.resetToken);
    return {
      status: 'success',
      message: 'OTP verified successfully',
      resetToken: response.data.resetToken
    };
  },

  resendPasswordResetOTP: async () => {
    const email = authService.getResetEmail();
    const otpMethod = authService.getResetOTPMethod();
    if (!email || !otpMethod) {
      throw new Error('Session expired. Please start over.');
    }
    const response = await api.post('/resend-reset-otp', { email, otpMethod });
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to resend OTP');
    }
    return {
      status: 'success',
      message: 'New OTP sent successfully'
    };
  },

  resetPassword: async (password, confirmPassword) => {
    const resetToken = localStorage.getItem('resetToken');
    if (!resetToken) {
      throw new Error('No reset token found');
    }
    const response = await api.patch(`/resetPassword/${resetToken}`, {
      password,
      confirmPassword
    });
    authService.clearResetEmail();
    authService.clearResetOTPMethod();
    localStorage.removeItem('resetToken');
    return normalizeResponse(response);
  },

  updatePassword: async (currentPassword, password, confirmPassword) => {
    const response = await api.patch('/updateMyPassword', {
      currentPassword,
      password,
      confirmPassword
    });
    return normalizeResponse(response);
  },

  updateProfile: async (updatedData) => {
    try {
      const response = await api.post('/update-profile', updatedData); 
      
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response.data || null,
        message: response.data?.message || 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 
                error.message || 
                'Failed to update profile'
      };
    }
  },

 /* updateProfile: async (updatedData) => {
    try {
      const response = await api.post('/update-profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Add token if available
        },
        body: JSON.stringify(updatedData),
      });
      if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response.data || null,
        message: response.data.message || 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 
                error.message || 
                'Failed to update profile'
      };
    }
  },*/

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('resetToken');
    localStorage.removeItem('resetOTPMethod');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getYearOptions: () => [
    { value: '1', label: 'Year 1' },
    { value: '2', label: 'Year 2' },
    { value: '3', label: 'Year 3' },
    { value: '4', label: 'Year 4' }
  ],

  getSemesterOptions: () => [
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' }
  ],

  getOTPMethodOptions: () => [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'Email' }
  ]
};
