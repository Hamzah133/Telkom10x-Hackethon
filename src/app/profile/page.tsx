import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const enrolledCourses = [
  "Basic Finances",
  "Workplace English",
  "Essential Maths",
  "World Geography",
  "General Science",
];

export default function ProfilePage() {
  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">User Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
      </header>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person portrait" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-headline">Jane Doe</CardTitle>
                <p className="text-muted-foreground">jane.doe@example.com</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {enrolledCourses.map((course) => (
                <Badge key={course} variant="secondary" className="text-base px-3 py-1">
                  {course}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
