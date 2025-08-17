"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { textToSpeech } from "@/ai/flows/ttsFlow";
import { Volume2 } from "lucide-react";

const lessonContent = `Financial goals are important because they can help fund your lifestyle, helping you meet both personal and professional objectives. It's helpful to divide them into short, medium and long-term objectives. In the short term, it's helpful to reduce debt, create a savings account and create a budget that accommodates your lifestyle. In the medium and long term, it's useful to focus on financial stability and retirement planning.`;

const lessonBenefits = [
    "It can lead to financial freedom.",
    "It increases your chances of having a comfortable retirement.",
    "It can help you reduce or eliminate debt.",
    "It can help you save money for emergency situations.",
];

export default function BasicFinancesPage() {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReadAloud = async () => {
    setIsLoading(true);
    setError(null);
    setAudioSrc(null);
    try {
        const fullText = `${lessonContent} These are some of the benefits of creating financial goals: ${lessonBenefits.join('. ')}`;
        const result = await textToSpeech({ text: fullText });
        if (result.audioDataUri) {
            setAudioSrc(result.audioDataUri);
        } else {
            setError("Could not generate audio. Please try again.");
        }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating audio.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Basic Finances: Why are financial goals important?</h1>
      </header>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Lesson Details</CardTitle>
            <Button onClick={handleReadAloud} disabled={isLoading}>
                <Volume2 className="mr-2 h-4 w-4" />
                {isLoading ? "Generating Audio..." : "Read Aloud"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
                {lessonContent}
            </p>
            <h3 className="font-bold font-headline text-lg">These are some of the benefits of creating financial goals:</h3>
            <ul className="list-disc list-inside space-y-2">
                {lessonBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
            {error && <p className="text-red-500">{error}</p>}
            {audioSrc && (
              <div className="mt-4">
                <audio controls autoPlay src={audioSrc}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
