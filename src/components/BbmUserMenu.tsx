import { User, LogIn, LogOut, UserCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function BbmUserMenu() {
  const [token] = useState(() => localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!token) {
    // Logged out state
    return (
      <div className="relative" ref={menuRef}>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
          onClick={() => setOpen(o => !o)}
        >
          <User size={22} className="text-purple-600 dark:text-purple-400" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-40 overflow-hidden">
            <Link 
              to="/login" 
              className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3 text-gray-800 dark:text-gray-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3 text-gray-800 dark:text-gray-200 transition-colors border-t border-gray-200 dark:border-gray-700"
              onClick={() => setOpen(false)}
            >
              <UserCircle size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Logged in state
  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <User size={22} className="text-blue-600 dark:text-blue-400" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-40 overflow-hidden">
          <Link 
            to="/profile" 
            className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3 text-gray-800 dark:text-gray-200 transition-colors"
            onClick={() => setOpen(false)}
          >
            <UserCircle size={18} />
            <span>Profile</span>
          </Link>
          <button 
            onClick={logOut}
            className="flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3 text-gray-800 dark:text-gray-200 transition-colors border-t border-gray-200 dark:border-gray-700"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}