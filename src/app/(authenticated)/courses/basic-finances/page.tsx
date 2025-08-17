"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { textToSpeech } from "@/ai/flows/ttsFlow";
import { Volume2, Languages, Pencil, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bantuBuddy } from "@/ai/flows/bantuBuddyFlow";
import { Textarea } from "@/components/ui/textarea";

const originalLessonContent = `Financial goals are important because they can help fund your lifestyle, helping you meet both personal and professional objectives. It's helpful to divide them into short, medium and long-term objectives. In the short term, it's helpful to reduce debt, create a savings account and create a budget that accommodates your lifestyle. For example, a short-term goal could be saving R500 in the next three months. In the medium and long term, it's useful to focus on financial stability and retirement planning. A medium-term goal could be saving for a down payment on a car, while a long-term goal would be saving for your retirement.`;

const originalLessonBenefits = [
    "It can lead to financial freedom.",
    "It increases your chances of having a comfortable retirement.",
    "It can help you reduce or eliminate debt.",
    "It can help you save money for emergency situations.",
];

const southAfricanLanguages = [
    "Zulu", "Xhosa", "Afrikaans", "Sepedi", "Tswana", "Sesotho", "Tsonga", "Swati", "Venda", "Ndebele"
];

const initialGoals = [
    { text: "Save R1000 for an emergency fund", isEditing: false },
    { text: "Create a monthly budget and stick to it", isEditing: false },
    { text: "Pay off my clothing store account", isEditing: false },
];

export default function BasicFinancesPage() {
  const [lessonContent, setLessonContent] = useState(originalLessonContent);
  const [lessonBenefits, setLessonBenefits] = useState(originalLessonBenefits);
  const [personalGoals, setPersonalGoals] = useState(initialGoals);
  
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleGoalChange = (index: number, newText: string) => {
    const updatedGoals = [...personalGoals];
    updatedGoals[index].text = newText;
    setPersonalGoals(updatedGoals);
  };

  const toggleGoalEditing = (index: number) => {
    const updatedGoals = [...personalGoals];
    updatedGoals[index].isEditing = !updatedGoals[index].isEditing;
    setPersonalGoals(updatedGoals);
  };

  const handleReadAloud = async () => {
    setIsLoadingAudio(true);
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
      setIsLoadingAudio(false);
    }
  };
  
  const handleTranslate = async () => {
    if (!selectedLanguage) {
        setError("Please select a language to translate to.");
        return;
    }
    
    // Reset to original if user wants to see it again
    if(selectedLanguage === 'English') {
        setLessonContent(originalLessonContent);
        setLessonBenefits(originalLessonBenefits);
        return;
    }
    
    setIsLoadingTranslation(true);
    setError(null);

    try {
        const contentToTranslate = `
        Lesson:
        ${originalLessonContent}
        
        Benefits:
        - ${originalLessonBenefits.join('\n- ')}
        `;

        const prompt = `Translate the following text to ${selectedLanguage}. Respond with ONLY the translation in a structured format. Start the lesson translation with "Lesson:" and the benefits with "Benefits:". Separate each benefit with a new line starting with '-'.`;

        const result = await bantuBuddy({ query: `${prompt}\n\n${contentToTranslate}` });
        
        const responseText = result.response;

        if (!responseText) {
            setError("Translation failed. The AI returned an empty response.");
            return;
        }
        
        const lessonMatch = responseText.match(/Lesson:([\s\S]*?)Benefits:/);
        const benefitsMatch = responseText.match(/Benefits:([\s\S]*)/);
        
        if (lessonMatch && benefitsMatch) {
            const translatedLesson = lessonMatch[1].trim();
            const translatedBenefits = benefitsMatch[1].trim().split('\n').map(b => b.trim().replace(/^- /, ''));
            setLessonContent(translatedLesson);
            setLessonBenefits(translatedBenefits);
        } else {
            // Fallback for unstructured response
            setLessonContent(responseText);
            setLessonBenefits([]);
        }

    } catch (err) {
        console.error(err);
        setError("An error occurred during translation.");
    } finally {
        setIsLoadingTranslation(false);
    }
  }

  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Basic Finances: Setting Financial Goals</h1>
      </header>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="font-headline">Lesson Details</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                 <Button onClick={handleReadAloud} disabled={isLoadingAudio} className="w-full sm:w-auto">
                     <Volume2 className="mr-2 h-4 w-4" />
                     {isLoadingAudio ? "Generating..." : "Read Aloud"}
                 </Button>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English (Original)</SelectItem>
                            {southAfricanLanguages.map(lang => (
                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Button onClick={handleTranslate} disabled={isLoadingTranslation} className="w-full sm:w-auto">
                        <Languages className="mr-2 h-4 w-4" />
                        {isLoadingTranslation ? "Translating..." : "Translate"}
                    </Button>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
                {lessonContent}
            </p>
            <h3 className="font-bold font-headline text-lg">Key Benefits of Setting Financial Goals:</h3>
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

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Your Personal Financial Goals</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {personalGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {goal.isEditing ? (
                                <Textarea
                                    value={goal.text}
                                    onChange={(e) => handleGoalChange(index, e.target.value)}
                                    className="flex-grow bg-background"
                                />
                            ) : (
                                <p className="flex-grow p-2 rounded-md bg-secondary/30">{goal.text}</p>
                            )}
                            <Button size="icon" variant="ghost" onClick={() => toggleGoalEditing(index)}>
                                {goal.isEditing ? <Check className="h-5 w-5 text-green-500" /> : <Pencil className="h-5 w-5" />}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
