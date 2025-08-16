import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import CircularProgressBar from "@/components/CircularProgressBar";
import StatsCard from "@/components/StatsCard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-6 space-y-8">
      <header className="text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold font-headline text-primary">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your learning snapshot.</p>
      </header>

      <div className="flex flex-col items-center space-y-4 pt-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-2xl font-bold font-headline">Last Accessed Course</h2>
        <CircularProgressBar progress={90} courseName="Essential Maths" />
      </div>

      <div className="w-full max-w-4xl p-4 bg-primary/5 rounded-lg">
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 w-full">
          <StatsCard title="Courses Completed" value="2" icon={CheckCircle} />
          <StatsCard title="Courses In Progress" value="3" icon={PlayCircle} />
          <StatsCard title="Modules Not Started" value="1" icon={Clock} />
        </div>
      </div>
    </div>
  );
}
