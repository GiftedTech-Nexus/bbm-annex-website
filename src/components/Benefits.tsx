import { Globe2, Clock, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

export const Benefits = () => {
  const benefits = [
    {
      icon: Globe2,
      title: "Access From Anywhere",
      description: "Study materials available anytime, anywhere.",
      glowColor: "from-purple-500/20 to-blue-500/20" // Purple-blue glow
    },
    {
      icon: Clock,
      title: "No Deadlines",
      description: "Learn at your own pace without pressure.",
      glowColor: "from-amber-500/20 to-yellow-500/20" // Amber-yellow glow
    },
    {
      icon: DollarSign,
      title: "Free Resources",
      description: "Access a wealth of free study materials and resources.",
      glowColor: "from-emerald-500/20 to-teal-500/20" // Green-teal glow
    },
    {
      icon: Zap,
      title: "Career Growth",
      description: "Enhance your skills and knowledge for better job opportunities.",
      glowColor: "from-pink-500/20 to-rose-500/20" // Pink-rose glow
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-900/10 dark:to-blue-900/10">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={staggerContainer(0.1, 0.2)}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="text-3xl font-bold font-heading mb-4 dark:text-white"
          >
            Why Choose Bbm Annex?
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", "spring", 0.4, 1)}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Discover the advantages of getting easy access to study materials and resources for your university life.
            <br className="hidden md:block" />
            Join a community that empowers you to succeed in your studies.
            <br className="hidden md:block" />
            Experience the freedom and flexibility of remote learning.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={staggerContainer(0.1, 0.2)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100 }
                }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: false, margin: "0px 0px -100px 0px" }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.glowColor} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10`}></div>
                
                <motion.div
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-500 h-full relative z-10"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <Icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};