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
