import { Button } from "@/components/ui/button";
import { Book, FileText, Newspaper, Key } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Notes",
    icon: Book,
    color: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800",
    description: "All subjects and units",
    animation: "fadeIn",
    path: "/notes",
    glowColor: "hover:shadow-pink-500/20"
  },
  {
    name: "Past Papers",
    icon: FileText,
    color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    description: "Past exam papers and solutions",
    animation: "slideUp",
    path: "/past-papers",
    glowColor: "hover:shadow-blue-500/20"
  },
  {
    name: "Blogs",
    icon: Newspaper,
    color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    description: "Latest blogs and articles",
    animation: "zoomIn",
    path: "/blogs",
    glowColor: "hover:shadow-green-500/20"
  },
  {
    name: "All Categories",
    icon: Key,
    color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    description: "Explore all categories",
    animation: "rotateIn",
    path: "/home",
    glowColor: "hover:shadow-purple-500/20"
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  show: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 100 } }
};

export const Categories = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMjI2NTkiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNm0wLTN2LTZoLTZ2NmgzbTMtM2gtM3YzaDN2LTMiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-20" />
      
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Explore by <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Category</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const animationVariant = 
              category.animation === "slideUp" ? slideUp :
              category.animation === "zoomIn" ? zoomIn :
              category.animation === "rotateIn" ? rotateIn :
              fadeIn;

            return (
              <motion.div
                key={category.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "0px 0px -50px 0px" }}
                variants={animationVariant}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={cn(
                    "relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300",
                    category.glowColor,
                    "hover:before:absolute hover:before:-inset-2 hover:before:rounded-xl hover:before:bg-current hover:before:opacity-10"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 border",
                    category.color
                  )}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-300 dark:border-purple-500 text-purple-600 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                    onClick={() => handleNavigation(category.path)}
                  >
                    Go to Section
                  </Button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};