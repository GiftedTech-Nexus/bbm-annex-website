import { Link } from "react-router-dom";
import { BookOpen, ArrowUp, Twitter, MessageSquare, Facebook, Globe, Music } from "lucide-react";
import { motion } from "framer-motion";
import { authService } from "../services/auth";

export const Footer = () => {
  const isLoggedIn = authService.isAuthenticated();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="w-full py-8 bg-gray-50 text-gray-800 dark:bg-black dark:text-white border-t border-gray-200 dark:border-gray-800">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-techwork-purple text-white dark:bg-white dark:text-black border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* For Learners - Top section */}
          {isLoggedIn && (
            <div className="w-full md:w-1/3">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center bg-techwork-purple-light text-white dark:bg-white dark:text-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-techwork-purple-light to-techwork-blue-light dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  BBM ANNEX
                </h3>
              </div>
              <h4 className="font-semibold mb-4 text-lg dark:text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { to: "/notes", text: "Notes" },
                  { to: "/blog", text: "Blogs" },
                  { to: "/shop", text: "Shop" },
                  { to: "/gallery", text: "Gallery" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.to} 
                      className="text-sm text-gray-600 hover:text-techwork-purple dark:text-gray-300 dark:hover:text-white transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About - Always visible */}
          <div>
            <h4 className="font-semibold mb-4 text-lg dark:text-white">About</h4>
            <ul className="space-y-2">
              {[
                { to: "/faqs", text: "FAQs" },
                { to: "/contact", text: "Contact" },
                { to: "/vision", text: "Vision" },
                { to: "/mission", text: "Mission" },
                { to: "/data-usage", text: "Data Usage" },
                { to: "/privacy", text: "Privacy Policy" },
                { to: "/terms", text: "Terms of Use" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className="text-sm text-gray-600 hover:text-techwork-purple dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Icons - White in dark mode */}
        <div className="mt-8 flex justify-center gap-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 dark:text-white dark:hover:text-blue-400 transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 dark:text-white dark:hover:text-green-500 transition-colors">
            <MessageSquare className="w-6 h-6" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black dark:text-white dark:hover:text-pink-500 transition-colors">
            <Music className="w-6 h-6" />
          </a>
          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 dark:text-white dark:hover:text-purple-500 transition-colors">
            <Globe className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright section - Now matches dark footer background */}
        <motion.div 
          className="mt-8 p-6 rounded-xl text-center bg-purple-50/80 dark:bg-black border border-purple-100 dark:border-gray-700"
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0 0 rgba(11, 212, 81, 0)",
              "0 0 0 4px rgba(7, 175, 12, 0.1)",
              "0 0 0 0 rgba(12, 180, 12, 0)"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 45, 0],
                  color: ["#8b5cf6", "#a78bfa", "#8b5cf6"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOpen className="w-5 h-5 dark:text-white" />
              </motion.div>
            </motion.div>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              © 2023 - {new Date().getFullYear()} BBM ANNEX
            </span>
          </div>
          <motion.p 
            className="mt-1 text-sm text-gray-700/80 dark:text-gray-300"
            animate={{
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
              ease: "easeInOut"
            }}
          >
            Gifted Tech 💜. All Rights Reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};