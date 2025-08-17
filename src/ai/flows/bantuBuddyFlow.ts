'use server';
/**
 * @fileOverview A friendly AI assistant for the Bantu Learn app.
 *
 * - bantuBuddy - A function that handles the AI assistant's responses.
 * - BantuBuddyInput - The input type for the bantuBuddy function.
 * - BantuBuddyOutput - The return type for the bantuBuddy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const BantuBuddyInputSchema = z.object({
  query: z.string().describe('The user\'s question or request.'),
});
export type BantuBuddyInput = z.infer<typeof BantuBuddyInputSchema>;

const BantuBuddyOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type BantuBuddyOutput = z.infer<typeof BantuBuddyOutputSchema>;

export async function bantuBuddy(input: BantuBuddyInput): Promise<BantuBuddyOutput> {
  return bantuBuddyFlow(input);
}

const courses = [
  "Basic Finances",
  "Workplace English",
  "Essential Maths",
  "World Geography",
  "General Science",
  "Introduction to Computers"
];

const prompt = ai.definePrompt({
  name: 'bantuBuddyPrompt',
  input: {schema: BantuBuddyInputSchema},
  output: {schema: BantuBuddyOutputSchema},
  prompt: `You are "Bantu Buddy," a friendly and encouraging AI assistant for the Bantu Learn platform. Your goal is to help general workers who are upskilling.

Your capabilities are:
1.  **Answer Questions About Courses:** Provide brief, clear explanations about the available courses.
2.  **Translate Text:** Translate user-provided text into any African language they request. Be precise with translations.
3.  **Provide Motivation:** Offer encouraging words or motivational quotes.

**Available Courses:**
- ${courses.join('\n- ')}

**Tone:** Always be positive, friendly, and supportive. Keep responses concise and easy to understand.

**User Query:** {{{query}}}
`,
});

const bantuBuddyFlow = ai.defineFlow(
  {
    name: 'bantuBuddyFlow',
    inputSchema: BantuBuddyInputSchema,
    outputSchema: BantuBuddyOutputSchema,
  },
  async ({ query }) => {
    // Mocked response logic to avoid needing an API key for the demo.
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery.includes('translate')) {
      return { response: "Of course! 'Hello, how are you?' in isiZulu is 'Sawubona, unjani?'" };
    }

    if (lowerCaseQuery.includes('finance')) {
        return { response: "The 'Basic Finances' course teaches you how to manage your money, create a budget, and save for the future. It's a great first step towards financial freedom!" };
    }

    if (lowerCaseQuery.includes('motivat') || lowerCaseQuery.includes('quote')) {
        return { response: "You've got this! 'The secret of getting ahead is getting started.' - Mark Twain" };
    }

    return { response: "Hello! I'm Bantu Buddy. You can ask me about our courses, for a motivational quote, or to translate something for you." };
  }
);
