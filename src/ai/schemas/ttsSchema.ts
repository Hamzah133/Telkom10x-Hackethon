import { z } from "zod";

export const TextToSpeechInputSchema = z.object({
  text: z.string().describe("The text to convert to speech."),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

export const TextToSpeechOutputSchema = z.object({
  audioDataUri: z
    .string()
    .optional()
    .describe(
      "The generated audio as a data URI. Format: 'data:audio/wav;base64,<encoded_data>'"
    ),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;
