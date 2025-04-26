import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { Book, Menu, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BbmUserMenu } from "./BbmUserMenu";
import { BbmMobileMenu } from "./BbmMobileMenu";
import { authService } from "../services/auth";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = authService.isAuthenticated();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        // Close user menu if open
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Typing animation for BBM ANNEX
  useEffect(() => {
    const text = "BBM ANNEX";
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const renderYearDropdown = (basePath: string) => (
    <div className="absolute left-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
      {[1, 2, 3, 4].map((year) => (
        <div key={year} className="relative group">
          <Link
            to={`${basePath}/year${year}`}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
            onClick={() => setOpenDropdown(null)}
          >
            Year {year}
            <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform" />
          </Link>
          <div className="absolute left-full top-0 ml-1 hidden group-hover:block w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
            <Link
              to={`${basePath}/year${year}/semester1`}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpenDropdown(null)}
            >
              Semester 1
            </Link>
            <Link
              to={`${basePath}/year${year}/semester2`}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpenDropdown(null)}
            >
              Semester 2
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Brand + Nav */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <div className="w-9 h-9 rounded-lg mr-2 bg-purple-600 flex items-center justify-center text-white font-bold font-heading">
              <Book className="w-5 h-5 animate-spin-slow" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wider">
              {typingText || <span className="invisible">BBM ANNEX</span>}
            </h1>
          </Link>
          
          {/* Only show navigation when logged in */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-10">
              <Link to="/" className="relative hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {/* Notes Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                  onClick={() => toggleDropdown('notes')}
                >
                  Notes
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'notes' ? 'rotate-180' : ''}`} />
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                {openDropdown === 'notes' && renderYearDropdown('/notes')}
              </div>

              {/* Past Papers Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  onClick={() => toggleDropdown('past-papers')}
                >
                  Past Papers
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'past-papers' ? 'rotate-180' : ''}`} />
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                {openDropdown === 'past-papers' && renderYearDropdown('/past-papers')}
              </div>

              <Link to="/blog" className="relative hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                Blog
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/shop" className="relative hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                Shop
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/gallery" className="relative hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                Gallery
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>
          )}
        </div>

        {/* Right side: Theme, user, and mobile menu */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="scale-75 md:scale-90">
            <ThemeToggle />
          </div>
          <div ref={userMenuRef}>
            <BbmUserMenu />
          </div>
          <button 
            className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
      <BbmMobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Add to your global CSS */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </header>
  );
};