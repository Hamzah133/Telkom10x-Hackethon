'use server';
/**
 * @fileOverview A text-to-speech AI flow.
 *
 * - textToSpeech - A function that converts text to speech audio.
 */

import { ai } from "@/ai/genkit";
import { googleAI } from "@genkit-ai/googleai";
import wav from "wav";
import { TextToSpeechInputSchema, TextToSpeechOutputSchema, type TextToSpeechInput, type TextToSpeechOutput } from "@/ai/schemas/ttsSchema";


export async function textToSpeech(
  input: TextToSpeechInput
): Promise<TextToSpeechOutput> {
  return ttsFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on("error", reject);
    writer.on("data", (d) => bufs.push(d));
    writer.on("end", () =>
      resolve(Buffer.concat(bufs).toString("base64"))
    );

    writer.write(pcmData);
    writer.end();
  });
}

const ttsFlow = ai.defineFlow(
  {
    name: "ttsFlow",
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: googleAI.model("gemini-2.5-flash-preview-tts"),
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Algenib" },
          },
        },
      },
      prompt: text,
    });

    if (!media || !media.url) {
      console.error("No media returned from TTS model");
      return { audioDataUri: undefined };
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(",") + 1),
      "base64"
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
