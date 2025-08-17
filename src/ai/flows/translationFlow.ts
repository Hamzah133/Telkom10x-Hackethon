'use server';
/**
 * @fileOverview A dedicated AI flow for translating course content.
 *
 * - translateContent - A function that handles the translation process.
 */

import {ai} from '@/ai/genkit';
import { TranslateContentInputSchema, TranslatedContentSchema, type TranslateContentInput, type TranslatedContent } from '@/ai/schemas/translationSchema';

export async function translateContent(input: TranslateContentInput): Promise<TranslatedContent | null> {
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
    outputSchema: z.nullable(TranslatedContentSchema),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output ?? null;
  }
);
