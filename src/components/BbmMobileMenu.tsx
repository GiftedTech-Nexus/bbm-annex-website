import { Link } from "react-router-dom";
import { authService } from "../services/auth";
import { useState, useEffect } from "react";
import { BookCheck, BookOpen, BookText, CameraIcon, CheckCircle, ChevronDown, ChevronRight, Home, ShoppingCart, User, X } from "lucide-react";

export function BbmMobileMenu({ open, onClose }: { open: boolean, onClose: () => void }) {
  const isLoggedIn = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();
  const [openSubmenu, setOpenSubmenu] = useState<{
    notes: boolean;
    pastPapers: boolean;
    year1: boolean;
    year2: boolean;
    year3: boolean;
    year4: boolean;
  }>({
    notes: false,
    pastPapers: false,
    year1: false,
    year2: false,
    year3: false,
    year4: false,
  });

  // Disable scrolling and apply blur to background content when menu is open
  useEffect(() => {
    const appContent = document.getElementById('app-content');
    
    if (open) {
      document.body.style.overflow = 'hidden';
      if (appContent) {
        appContent.style.filter = 'blur(4px)';
        appContent.style.transition = 'filter 0.3s ease';
      }
    } else {
      document.body.style.overflow = '';
      if (appContent) {
        appContent.style.filter = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      if (appContent) {
        appContent.style.filter = '';
      }
    };
  }, [open]);

  const toggleSubmenu = (menu: keyof typeof openSubmenu) => {
    setOpenSubmenu(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const renderYearSubmenu = (basePath: string, year: number) => {
    const yearKey = `year${year}` as keyof typeof openSubmenu;
    return (
      <div className="ml-6 mt-1 flex flex-col gap-1">
        <button 
          className="flex items-center justify-between gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 text-sm"
          onClick={() => toggleSubmenu(yearKey)}
        >
          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            Year {year}
          </div>
          {openSubmenu[yearKey] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {openSubmenu[yearKey] && (
          <div className="ml-6 flex flex-col gap-1">
            <Link 
              to={`${basePath}/year${year}/semester1`} 
              className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 text-sm"
              onClick={onClose}
            >
              <ChevronRight className="w-4 h-4" />
              Semester 1
            </Link>
            <Link 
              to={`${basePath}/year${year}/semester2`} 
              className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 text-sm"
              onClick={onClose}
            >
              <ChevronRight className="w-4 h-4" />
              Semester 2
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay with backdrop blur */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-[98] backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs z-[99] shadow-lg transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-gray-900`}
        style={{ minWidth: 260 }}
      >
        {/* Spacer to push menu below header */}
        <div className="h-16"></div>
        
        {/* Menu header with circular close button */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {isLoggedIn ? (
            <span className="font-bold text-xl text-gray-900 dark:text-white">Menu</span>
          ) : null}
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Menu items */}
        <nav className="flex flex-col gap-1 px-4 py-6 bg-white dark:bg-gray-900 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {isLoggedIn ? (
            <>
              <Link 
                to="/" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200" 
                onClick={onClose}
              >
                <Home className="w-5 h-5" /> 
                <span>Home</span>
              </Link>

              {/* Notes with submenu */}
              <div className="flex flex-col">
                <button 
                  className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200"
                  onClick={() => toggleSubmenu('notes')}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" /> 
                    <span>Notes</span>
                  </div>
                  {openSubmenu.notes ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {openSubmenu.notes && (
                  <div className="ml-4">
                    {[1, 2, 3, 4].map(year => renderYearSubmenu('/notes', year))}
                  </div>
                )}
              </div>

              {/* Past Papers with submenu */}
              <div className="flex flex-col">
                <button 
                  className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200"
                  onClick={() => toggleSubmenu('pastPapers')}
                >
                  <div className="flex items-center gap-3">
                    <BookCheck className="w-5 h-5" /> 
                    <span>Past Papers</span>
                  </div>
                  {openSubmenu.pastPapers ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {openSubmenu.pastPapers && (
                  <div className="ml-4">
                    {[1, 2, 3, 4].map(year => renderYearSubmenu('/past-papers', year))}
                  </div>
                )}
              </div>

              <Link 
                to="/blog" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200" 
                onClick={onClose}
              >
                <BookText className="w-5 h-5" /> 
                <span>Blog</span>
              </Link>
              <Link 
                to="/shop" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200" 
                onClick={onClose}
              >
                <ShoppingCart className="w-5 h-5" /> 
                <span>Shop</span>
              </Link>
              <Link 
                to="/gallery" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200" 
                onClick={onClose}
              >
                <CameraIcon className="w-5 h-5" /> 
                <span>Gallery</span>
              </Link>
            </>
          ) : null}

          <Link 
            to="/profile" 
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200" 
            onClick={onClose}
          >
            <User className="w-5 h-5" /> 
            {isLoggedIn && currentUser ? (
              <div className="flex items-center gap-1">
                <span>{currentUser.username}</span>
                {currentUser.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            ) : (
              <span>Login</span>
            )}
          </Link>
        </nav>
        
        {/* Fixed footer at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="font-bold animate-heartbeat text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400">
              BBM ANNEX &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}