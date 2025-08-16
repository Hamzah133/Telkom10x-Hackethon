import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const demoCourses = [
  { name: "Introduction to JavaScript", progress: 100 },
  { name: "Advanced React Patterns", progress: 65 },
  { name: "UI/UX Design Fundamentals", progress: 30 },
  { name: "State Management with Zustand", progress: 0 },
  { name: "Next.js for Production", progress: 85 },
  { name: "DevOps for Frontend Engineers", progress: 10 },
];

export default function CoursesPage() {
  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">All Courses</h1>
        <p className="text-muted-foreground mt-2">Continue your learning journey.</p>
      </header>
      <div className="max-w-4xl mx-auto space-y-4">
        {demoCourses.map((course) => (
          <Card key={course.name}>
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
