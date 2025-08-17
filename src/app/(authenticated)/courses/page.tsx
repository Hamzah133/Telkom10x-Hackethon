import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Coins, Globe, Languages, Laptop, Baby } from "lucide-react";
import Link from "next/link";

const demoCourses = [
  { name: "Basic Finances", progress: 75, icon: Coins, href: "/courses/basic-finances" },
  { name: "Workplace English", progress: 50, icon: Languages, href: "/courses" },
  { name: "Basic Child Care", progress: 0, icon: Baby, href: "/courses" },
  { name: "World Geography", progress: 20, icon: Globe, href: "/courses" },
  { name: "General Science", progress: 35, icon: Book, href: "/courses" },
  { name: "Introduction to Computers", progress: 0, icon: Laptop, href: "/courses" },
];

export default function CoursesPage() {
  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">All Courses</h1>
        <p className="text-muted-foreground mt-2">Continue your learning journey.</p>
      </header>
      <div className="max-w-4xl mx-auto space-y-4">
        {demoCourses.map((course, index) => (
          <Link href={course.href} key={course.name}>
            <Card className="animate-fade-in-up hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <course.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-xl font-headline">{course.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Progress value={course.progress} className="w-full" />
                  <span className="text-sm font-semibold text-muted-foreground">{course.progress}%</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
