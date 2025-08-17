'use server';
/**
 * @fileOverview A dedicated AI flow for translating course content.
 *
 * - translateContent - A function that handles the translation process.
 * - TranslateContentInput - The input type for the translateContent function.
 * - TranslatedContent - The return type for the translateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const TranslatedContentSchema = z.object({
    intro: z.string().describe('The translated introduction.'),
    sections: z.array(z.object({
        title: z.string().describe('The translated section title.'),
        content: z.string().describe('The translated section content.')
    })).describe('The translated sections.'),
    summary: z.string().describe('The translated summary.')
});
export type TranslatedContent = z.infer<typeof TranslatedContentSchema>;

export const TranslateContentInputSchema = z.object({
  language: z.string().describe('The target language for translation.'),
  content: z.object({
    intro: z.string(),
    sections: z.array(z.object({
        title: z.string(),
        content: z.string()
    })),
    summary: z.string()
  }).describe("The original course content to be translated."),
});
export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;


export async function translateContent(input: TranslateContentInput): Promise<TranslatedContent> {
  return translationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translationPrompt',
  input: {schema: TranslateContentInputSchema},
  output: {schema: TranslatedContentSchema},
  prompt: `Translate the following course content into {{language}}. Provide ONLY the translated JSON object.

Original Content:
Introduction: {{content.intro}}

{{#each content.sections}}
Section Title: {{this.title}}
Section Content: {{this.content}}
{{/each}}

Summary: {{content.summary}}
`,
});

const translationFlow = ai.defineFlow(
  {
    name: 'translationFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslatedContentSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
