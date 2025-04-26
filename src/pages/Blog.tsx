import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookText, ChevronRight, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {  
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 mt-16">
        <div className="container">
          {/* Navigation Breadcrumb */}
          <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              <li aria-current="page">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Blog</span>
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex items-center gap-3 mb-6">
            <BookText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold font-heading dark:text-white">Blog</h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Read our latest educational insights for students and professionals.
          </p>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Blog posts coming soon...
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              We're preparing valuable content to help you with your studies.
            </p>
            <div className="mt-6">
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;