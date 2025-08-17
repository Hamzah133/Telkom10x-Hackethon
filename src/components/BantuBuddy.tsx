"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { bantuBuddy } from '@/ai/flows/bantuBuddyFlow';
import type { BantuBuddyInput } from '@/ai/schemas/bantuBuddySchema';

export default function BantuBuddy() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    try {
      const input: BantuBuddyInput = { query };
      const result = await bantuBuddy(input);
      setResponse(result.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Sorry, I couldn't get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: '850ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="w-6 h-6 text-primary" />
          Bantu Buddy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Ask'}
          </Button>
        </form>
        {response && (
          <div className="mt-4 p-4 bg-secondary rounded-lg text-secondary-foreground">
            <p>{response}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
