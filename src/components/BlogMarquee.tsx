
import { useEffect, useRef, useState, useCallback } from "react";
import { BlogCard } from "./BlogCard";

// Updated job data with actual company logos
const blogsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$120k - $150k",
    category: "Frontend Development",
    logo: "https://www.google.com/favicon.ico",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Microsoft",
    location: "Remote",
    salary: "$90k - $120k",
    category: "Design",
    logo: "https://www.microsoft.com/favicon.ico",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Amazon",
    location: "Remote",
    salary: "$130k - $160k",
    category: "Backend",
    logo: "https://www.amazon.com/favicon.ico",
  },
  {
    id: 4,
    title: "DevOps Specialist",
    company: "Meta",
    location: "Remote",
    salary: "$140k - $170k",
    category: "DevOps",
    logo: "https://www.meta.com/favicon.ico",
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Apple",
    location: "Remote",
    salary: "$110k - $140k",
    category: "Product",
    logo: "https://www.apple.com/favicon.ico",
  },
  {
    id: 6,
    title: "Mobile Developer",
    company: "Netflix",
    location: "Remote",
    salary: "$100k - $130k",
    category: "Mobile Development",
    logo: "https://www.netflix.com/favicon.ico",
  },
];

export const BlogMarquee = () => {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollSpeed = 0.5;
  const animation1Ref = useRef<number>();
  const animation2Ref = useRef<number>();

  const scrollColumns = useCallback(() => {
    if (!column1Ref.current || !column2Ref.current || isHovered) return;

    // Scroll first column down
    column1Ref.current.scrollTop += scrollSpeed;
    if (column1Ref.current.scrollTop >= column1Ref.current.scrollHeight / 2) {
      column1Ref.current.scrollTop = 0;
    }

    // Scroll second column up
    column2Ref.current.scrollTop -= scrollSpeed;
    if (column2Ref.current.scrollTop <= 0) {
      column2Ref.current.scrollTop = column2Ref.current.scrollHeight / 2;
    }

    animation1Ref.current = requestAnimationFrame(scrollColumns);
  }, [isHovered, scrollSpeed]);

  useEffect(() => {
    animation1Ref.current = requestAnimationFrame(scrollColumns);
    return () => {
      const animation1 = animation1Ref.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const animation2 = animation2Ref.current; // Copy ref value to a local variable

      if (animation1) {
        cancelAnimationFrame(animation1);
      }
      if (animation2) {
        cancelAnimationFrame(animation2);
      }
    };
  }, [isHovered, scrollColumns]);

  return (
    <div className="grid md:grid-cols-2 gap-6 h-[550px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First Column - Scrolling Down */}
      <div ref={column1Ref} className="overflow-hidden">
        <div className="space-y-4">
          {blogsData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          {blogsData.map((blog) => (
            <BlogCard key={`duplicate-${blog.id}`} blog={blog} />
          ))}
        </div>
      </div>

      {/* Second Column - Scrolling Up */}
      <div ref={column2Ref} className="overflow-hidden">
        <div className="space-y-4">
          {[...blogsData].reverse().map((blog) => (
            <BlogCard key={`col2-${blog.id}`} blog={blog} />
          ))}
          {[...blogsData].reverse().map((blog) => (
            <BlogCard key={`col2-duplicate-${blog.id}`} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

