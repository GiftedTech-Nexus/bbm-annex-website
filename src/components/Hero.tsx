import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { BlogMarquee } from "./BlogMarquee";

export const Hero = () => {
  return (
    <section className="pt-32 pb-12 lg:pt-40 relative overflow-hidden">
      {/* Background elements with dark mode variants */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-900/10 dark:to-blue-900/10 -z-10" />
      <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 dark:bg-purple-900/20 -top-32 -left-32 blur-3xl" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-900/20 -bottom-48 -right-48 blur-3xl" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="relative z-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight mb-6 text-gray-900 dark:text-white">
              Find exceptional <span className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Useful Notes</span> for your Studies
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover course notes, study guides, product resources, and blogs for every student. 
              Your study success starts here, with BBM ANNEX.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notes, guides, products, or blogs..."
                  className="pl-10 h-12 w-full md:w-96 rounded-full border border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <Button className="h-12 px-8 rounded-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white">
                Search Resources
              </Button>
            </div>
          </div>
          
          {/* Featured / Motivational Marquee */}
          <div className="relative z-10">
            <BlogMarquee />
          </div>
        </div>
      </div>
    </section>
  );
};