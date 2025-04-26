import { Chrome, Github, Slack, Twitter, Figma, Briefcase } from "lucide-react";

export const TrustedBy = () => {
  const companies = [
    { icon: Github, name: "GitHub" },
    { icon: Slack, name: "Slack" },
    { icon: Briefcase, name: "Microsoft" },
    { icon: Chrome, name: "Google" },
    { icon: Twitter, name: "Twitter" },
    { icon: Figma, name: "Figma" },
  ];

  return (
    <section className="py-12 border-y border-border/40 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-techwork-purple/2 to-techwork-blue/2 dark:from-techwork-purple/10 dark:to-techwork-blue/10" />
      
      <div className="container relative">
        <h2 className="text-center text-sm font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider mb-8">
          Trusted by leading tech companies
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {companies.map((company, i) => {
            const Icon = company.icon;
            return (
              <div 
                key={i} 
                className="h-12 w-32 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 hover:border-techwork-purple/20 dark:hover:border-techwork-purple/40 transition-all duration-300 hover:shadow-md group"
              >
                <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-techwork-purple dark:group-hover:text-techwork-purple/90 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};