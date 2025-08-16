import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import CircularProgressBar from "@/components/CircularProgressBar";
import StatsCard from "@/components/StatsCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your learning snapshot.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 w-full max-w-4xl">
        <StatsCard title="Courses Completed" value="5" icon={CheckCircle} />
        <StatsCard title="Courses In Progress" value="3" icon={PlayCircle} />
        <StatsCard title="Modules Not Started" value="12" icon={Clock} />
      </div>

      <div className="flex flex-col items-center space-y-4 pt-8">
        <h2 className="text-2xl font-bold font-headline">Last Accessed Course</h2>
        <CircularProgressBar progress={65} courseName="Advanced React Patterns" />
      </div>
    </div>
  );
}
