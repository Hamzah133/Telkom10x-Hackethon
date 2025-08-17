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
  query: z.string().describe("The user's question or request."),
});
export type BantuBuddyInput = z.infer<typeof BantuBuddyInputSchema>;

const BantuBuddyOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});
export type BantuBuddyOutput = z.infer<typeof BantuBuddyOutputSchema>;

export async function bantuBuddy(input: BantuBuddyInput): Promise<BantuBuddyOutput> {
  return bantuBuddyFlow(input);
}

const courses = [
    { name: "Basic Finances", description: "Learn how to manage your money, create a budget, and save for the future. It's a great first step towards financial freedom!" },
    { name: "Workplace English", description: "Improve your English communication skills for the workplace, including writing emails and speaking confidently." },
    { name: "Basic Child Care", description: "Learn the fundamentals of child care, from safety and nutrition to early childhood development." },
    { name: "World Geography", description: "Explore the world from your screen! Learn about different countries, capitals, and cultures." },
    { name: "General Science", description: "Understand the basics of biology, chemistry, and physics in an easy-to-digest format." },
    { name: "Introduction to Computers", description: "Get started with computers, from turning one on to using essential software like web browsers and word processors." }
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
- ${courses.map(c => c.name).join('\n- ')}

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
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
