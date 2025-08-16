import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const demoCourses = [
  { name: "Basic Finances", progress: 75 },
  { name: "Workplace English", progress: 50 },
  { name: "Essential Maths", progress: 90 },
  { name: "World Geography", progress: 20 },
  { name: "General Science", progress: 35 },
  { name: "Introduction to Computers", progress: 0 },
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
          <Card key={course.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
            <CardHeader>
              <CardTitle className="text-xl font-headline">{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={course.progress} className="w-full" />
                <span className="text-sm font-semibold text-muted-foreground">{course.progress}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
