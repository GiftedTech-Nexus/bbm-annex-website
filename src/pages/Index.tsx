import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { CTASection } from "@/components/CTASection";
import { BookOpen, ArrowRight, Mail, User, GalleryVerticalEnd, NotebookText, FileText, ArrowRightCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const texts = [
    "Empowering students with Knowledge",
    "Your academic success partner", 
    "Quality notes for better grades",
    "Learn smarter, not harder"
  ];

  const adverts = [
    {
      title: "My Profile",
      description: "Manage your account and preferences",
      icon: <User className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
      link: "/profile"
    },
    {
      title: "Notes",
      description: "Access all subject notes and materials",
      icon: <NotebookText className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
      link: "/notes"
    },
    {
      title: "Past Papers",
      description: "Practice with past exam papers",
      icon: <FileText className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
      link: "/past-papers"
    },
    {
      title: "Gallery",
      description: "View our collection of resources",
      icon: <GalleryVerticalEnd className="w-8 h-8 text-gray-700 dark:text-gray-300" />,
      link: "/gallery"
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    const adInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => 
        prevIndex === adverts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(adInterval);
    };
  }, [texts.length, adverts.length]);

  const nextAd = () => {
    setCurrentAdIndex((prevIndex) => 
      prevIndex === adverts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAd = () => {
    setCurrentAdIndex((prevIndex) => 
      prevIndex === 0 ? adverts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/* Hero Section - Completely redesigned for dark mode */}
        <section className="pt-32 pb-14 lg:pt-44 relative overflow-hidden bg-gradient-to-br from-techwork-purple/10 via-white to-techwork-blue/5 dark:bg-gray-900 dark:bg-none">
          {/* Light mode only decorative elements */}
          <div className="absolute w-72 h-72 rounded-full bg-techwork-purple/15 -top-24 -left-16 blur-2xl dark:hidden" />
          <div className="absolute w-96 h-96 rounded-full bg-techwork-blue/15 -bottom-36 -right-32 blur-3xl dark:hidden" />
          
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10 animate-fade-in">
                {/* Improved heading with dark mode support */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
                  <span className="typing-text block">
                    {texts[currentTextIndex]}
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                  BBM ANNEX brings all your unit notes, blogs, and resources together,
                  <br className="hidden md:block" />
                  designed for university life and success.
                  <br className="hidden md:block" />
                  Join an inspiring community of learners today.
                </p>

                {/* Advert Cards */}
                <div className="relative mb-8">
                  <div className="grid grid-cols-1 gap-4 min-h-[200px]">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                        {adverts[currentAdIndex].icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                        {adverts[currentAdIndex].title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {adverts[currentAdIndex].description}
                      </p>
                      <Link
                        to={adverts[currentAdIndex].link}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                      >
                        Go To <ArrowRightCircle className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                  <button 
                    onClick={prevAd}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button 
                    onClick={nextAd}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    to="/notes"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-green-800 hover:bg-gray-700 text-white font-bold text-lg shadow transition hover:shadow-md"
                  >
                    <BookOpen size={18} /> Explore
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-green-700 hover:bg-gray-600 text-white font-bold text-lg shadow transition hover:shadow-md"
                    >
                      <Mail size={18} /> Contact
                    </Link>
                  ) : (
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg shadow transition hover:shadow-md"
                    >
                      <User size={18} /> Join
                    </Link>
                  )}
                </div>
              </div>

              <div className="z-10 hidden lg:block">
                <div className="flex flex-col items-center justify-center h-full">
                  <BookOpen className="w-40 h-40 text-gray-700/80 shadow-2xl animate-float dark:text-gray-300/90" />
                  <div className="mt-5 font-heading text-xl text-gray-700 dark:text-gray-300 font-semibold text-center px-4">
                    Welcome to the learning hub.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Hero />
        <HowItWorks />
        <Benefits />
        <Categories />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;