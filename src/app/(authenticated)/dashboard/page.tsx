import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import CircularProgressBar from "@/components/CircularProgressBar";
import StatsCard from "@/components/StatsCard";
import BantuBuddy from "@/components/BantuBuddy";
import Logo from "@/components/Logo";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-6 space-y-8">
      <header className="relative w-full text-center animate-fade-in-up">
        <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold font-headline text-primary">Your Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your learning snapshot.</p>
        <div className="absolute top-0 right-0">
            <Logo size={80} />
        </div>
      </header>

      <div className="w-full max-w-4xl p-4 space-y-8">
        <div className="flex flex-col items-center space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold font-headline">Last Accessed Course</h2>
          <CircularProgressBar progress={75} courseName="Basic Finances" />
        </div>

        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 w-full">
          <StatsCard title="Courses Completed" value="2" icon={CheckCircle} animationDelay="400ms" />
          <StatsCard title="Courses In Progress" value="3" icon={PlayCircle} animationDelay="550ms" />
          <StatsCard title="Modules Not Started" value="1" icon={Clock} animationDelay="700ms" />
        </div>

        <BantuBuddy />
      </div>
    </div>
  );
}
