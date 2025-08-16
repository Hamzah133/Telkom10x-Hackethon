import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">About LearnForward</h1>
        <p className="text-muted-foreground mt-2">Our mission is to make learning accessible and engaging.</p>
      </header>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Welcome to LearnForward</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              LearnForward is a modern learning platform designed to help you acquire new skills at your own pace. 
              We believe in the power of interactive content and project-based learning to create a lasting impact.
            </p>
            <p>
              Our curriculum is curated by industry experts to ensure you're learning the most relevant and up-to-date material. 
              Whether you're starting a new career path or looking to level up your existing skills, LearnForward provides the tools and community to support your growth.
            </p>
            <p>
              Join us and take the next step in your professional development. Your future self will thank you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
