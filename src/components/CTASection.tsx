import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-techwork-purple to-techwork-blue dark:from-techwork-purple-dark dark:to-techwork-blue-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5" />
      <div className="absolute w-96 h-96 rounded-full bg-white/10 dark:bg-white/5 -top-48 -left-48 blur-3xl" />
      <div className="absolute w-96 h-96 rounded-full bg-white/10 dark:bg-white/5 -bottom-48 -right-48 blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-heading text-white mb-6">
            Ready to Start Your Study Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of students who found their dream study notes through BBM ANNEX
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Browse Notes Button with heartbeat animation */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "0 4px 12px rgba(255, 255, 255, 0.2)",
                  "0 4px 6px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Link to="/notes">
                <Button 
                  size="lg" 
                  className="bg-white text-techwork-purple hover:bg-white/90 dark:bg-white dark:text-techwork-purple-dark dark:hover:bg-white/90"
                >
                  Browse Notes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Upload Document Button with heartbeat animation */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 0 4px rgba(255, 255, 255, 0.1)",
                  "0 0 0 0 rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <Link to="/upload">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 dark:border-white/80 dark:text-white/90 dark:hover:bg-white/20 flex items-center"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload a document
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};