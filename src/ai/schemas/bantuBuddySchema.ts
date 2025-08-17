import {z} from 'zod';

export const BantuBuddyInputSchema = z.object({
  query: z.string().describe("The user's question or request."),
});
export type BantuBuddyInput = z.infer<typeof BantuBuddyInputSchema>;

export const BantuBuddyOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});
export type BantuBuddyOutput = z.infer<typeof BantuBuddyOutputSchema>;
