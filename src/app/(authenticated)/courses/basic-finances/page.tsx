"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { textToSpeech } from "@/ai/flows/ttsFlow";
import { Volume2, Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bantuBuddy } from "@/ai/flows/bantuBuddyFlow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const originalContent = {
  intro: `Welcome to Basic Finances! Understanding money is the first step towards building a secure future. This course will teach you the essential skills of budgeting, saving, and managing debt. Think of it as a toolkit for your financial well-being. By the end, you'll be able to make informed decisions that help you reach your personal and professional goals.`,
  sections: [
    { 
      title: "1. The Power of Budgeting",
      content: "A budget is a plan for your money. It's not about restriction; it's about control. By tracking your income (money in) and expenses (money out), you can see exactly where your money goes. The most popular method is the 50/30/20 rule: 50% of your income for needs (housing, food), 30% for wants (entertainment, hobbies), and 20% for savings and debt repayment. Creating a budget helps you prioritize spending and avoid surprises."
    },
    {
      title: "2. Saving: Your Path to Freedom",
      content: "Saving money is crucial for both emergencies and future goals. Start by building an emergency fund—a separate savings account with enough money to cover 3-6 months of essential living expenses. This is your safety net. Once that's in place, you can start saving for other things, like a down payment on a car, education, or retirement. Even small, regular contributions add up over time thanks to compound interest!"
    },
    {
      title: "3. Understanding and Managing Debt",
      content: "Debt is when you owe money to someone else. Not all debt is bad (like a home loan), but high-interest debt (like from credit cards or personal loans) can be a major obstacle. The key is to manage it wisely. Always make your minimum payments on time. To pay it off faster, consider the 'debt snowball' method (paying off the smallest debts first for motivation) or the 'debt avalanche' method (paying off the highest-interest debts first to save money)."
    },
  ],
  summary: "By mastering these three pillars—budgeting, saving, and managing debt—you gain control over your financial life. You'll be better prepared for unexpected events, empowered to make your dreams a reality, and on the path to long-term financial stability."
};

const southAfricanLanguages = [
    "Zulu", "Xhosa", "Afrikaans", "Sepedi", "Tswana", "Sesotho", "Tsonga", "Swati", "Venda", "Ndebele"
];


export default function BasicFinancesPage() {
  const [lessonContent, setLessonContent] = useState(originalContent);
  
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleReadAloud = async () => {
    setIsLoadingAudio(true);
    setError(null);
    setAudioSrc(null);
    try {
        const fullText = `${lessonContent.intro} ${lessonContent.sections.map(s => `${s.title}. ${s.content}`).join(' ')} ${lessonContent.summary}`;
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
        setLessonContent(originalContent);
        return;
    }
    
    setIsLoadingTranslation(true);
    setError(null);

    try {
        const contentToTranslate = `
        Introduction:
        ${originalContent.intro}
        
        Section 1 Title:
        ${originalContent.sections[0].title}
        Section 1 Content:
        ${originalContent.sections[0].content}

        Section 2 Title:
        ${originalContent.sections[1].title}
        Section 2 Content:
        ${originalContent.sections[1].content}

        Section 3 Title:
        ${originalContent.sections[2].title}
        Section 3 Content:
        ${originalContent.sections[2].content}

        Summary:
        ${originalContent.summary}
        `;

        const prompt = `Translate the following lesson content to ${selectedLanguage}. Respond with ONLY the translation in a structured format, keeping the same keys (Introduction, Section 1 Title, etc.).`;

        const result = await bantuBuddy({ query: `${prompt}\n\n${contentToTranslate}` });
        
        const responseText = result.response;

        if (!responseText || responseText.trim() === '') {
            setError("Translation failed. The AI returned an empty response.");
            return;
        }
        
        const introMatch = responseText.match(/Introduction:([\s\S]*?)Section 1 Title:/);
        const section1TitleMatch = responseText.match(/Section 1 Title:([\s\S]*?)Section 1 Content:/);
        const section1ContentMatch = responseText.match(/Section 1 Content:([\s\S]*?)Section 2 Title:/);
        const section2TitleMatch = responseText.match(/Section 2 Title:([\s\S]*?)Section 2 Content:/);
        const section2ContentMatch = responseText.match(/Section 2 Content:([\s\S]*?)Section 3 Title:/);
        const section3TitleMatch = responseText.match(/Section 3 Title:([\s\S]*?)Section 3 Content:/);
        const section3ContentMatch = responseText.match(/Section 3 Content:([\s\S]*?)Summary:/);
        const summaryMatch = responseText.match(/Summary:([\s\S]*)/);
        
        if (introMatch && section1TitleMatch && section1ContentMatch && section2TitleMatch && section2ContentMatch && section3TitleMatch && section3ContentMatch && summaryMatch) {
            setLessonContent({
                intro: introMatch[1].trim(),
                sections: [
                    { title: section1TitleMatch[1].trim(), content: section1ContentMatch[1].trim() },
                    { title: section2TitleMatch[1].trim(), content: section2ContentMatch[1].trim() },
                    { title: section3TitleMatch[1].trim(), content: section3ContentMatch[1].trim() }
                ],
                summary: summaryMatch[1].trim()
            });
        } else {
             setError("Could not parse the translated content. Please try again.");
             setLessonContent(originalContent);
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
        <h1 className="text-4xl font-bold font-headline text-primary">Basic Finances: The Essentials</h1>
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
            <p className="text-lg">
                {lessonContent.intro}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {lessonContent.sections.map((section, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="font-headline text-xl text-primary">{section.title}</AccordionTrigger>
                  <AccordionContent className="text-base">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             <h3 className="font-bold font-headline text-lg pt-4">In Summary:</h3>
             <p>{lessonContent.summary}</p>

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
