import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Banknote, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  logo: string;
}

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to="/blogs" className="block">
      <Card className="group overflow-hidden border border-border/40 hover:border-techwork-purple/30 transition-all duration-300 hover:shadow-lg hover:shadow-techwork-purple/10 hover:-translate-y-1 cursor-pointer">
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-techwork-purple to-techwork-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-lg" />
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-white to-techwork-gray-light flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm border border-border/30">
              <img 
                src={blog.logo} 
                alt={blog.company} 
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="font-medium text-base leading-tight group-hover:text-techwork-purple transition-colors">
                {blog.title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Posted 2h ago</span>
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-techwork-purple/5 text-techwork-purple border-techwork-purple/20 group-hover:bg-techwork-purple/10 transition-colors">
              {blog.category}
            </Badge>
            <Badge variant="outline" className="bg-techwork-blue/5 text-techwork-blue border-techwork-blue/20">
              {blog.company}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="p-5 pt-0 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{blog.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};