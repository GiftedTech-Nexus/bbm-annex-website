import { ArrowRight, Search, FileCheck, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Notes",
      description: "Search for the best notes and resources for your studies.",
      animation: "fadeIn"
    },
    {
      icon: FileCheck,
      title: "Browse Past Papers",
      description: "Find past papers and solutions to ace your exams.",
      animation: "slideUp"
    },
    {
      icon: Briefcase,
      title: "Get to Studying",
      description: "Start studying with the best resources available.",
      animation: "zoomIn"
    }
  ];

  // Enhanced animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl font-bold font-heading mb-4 dark:text-white"
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-muted-foreground dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Your journey to finding the perfect study notes starts here. Follow these simple steps to get started.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const animationVariant = 
              step.animation === "slideUp" ? slideUp : 
              step.animation === "zoomIn" ? zoomIn : 
              fadeIn;

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                variants={animationVariant}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 + index * 0.15 }}
                  >
                    <ArrowRight className="hidden md:block absolute -right-6 top-12 w-12 h-12 text-muted-foreground/20 dark:text-gray-600" />
                  </motion.div>
                )}
                <motion.div 
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { 
                      type: "spring", 
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_70px_rgba(124,58,237,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_30px_70px_rgba(124,58,237,0.3)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">{step.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-400">{step.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};