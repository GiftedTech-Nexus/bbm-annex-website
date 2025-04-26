
export const JobsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold font-heading">
              Featured Remote Jobs
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover top opportunities from companies around the world
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button className="px-3 py-1 rounded-full bg-techwork-purple text-white">
              All Jobs
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-techwork-gray-light/50 transition-colors">
              New
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-techwork-gray-light/50 transition-colors">
              Popular
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
