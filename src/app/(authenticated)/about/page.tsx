import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";

export default function AboutPage() {
  return (
    <div className="py-6 space-y-8">
      <header className="relative text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">About Bantu Learn</h1>
        <p className="text-muted-foreground mt-2">Our mission is to empower general workers by making learning accessible and engaging.</p>
        <div className="absolute top-0 right-0">
          <Logo size={40} />
        </div>
      </header>
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Welcome to Bantu Learn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              Bantu Learn is a modern learning platform designed to help general workers acquire new skills and advance their careers. 
              We believe in the power of practical, project-based learning to create a lasting impact.
            </p>
            <p>
              Our curriculum is curated by industry experts to provide you with the most relevant and up-to-date material. 
              Whether you're looking to formalize your existing knowledge or branch out into a new field, Bantu Learn provides the tools and community to support your growth.
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
