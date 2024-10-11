import * as fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load the environment variables
dotenv.config({ path: '.env' });

// Get the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
});

async function transcribeAudio(filePath:string) {
  // Read the audio file as a stream
  const fileStream = fs.createReadStream(filePath);

  try {
    const response = await openai.audio.transcriptions.create({
      file: fileStream,
      model: 'whisper-1',
      language: 'en', // Optional: specify the language
      response_format: 'text', // Options: 'text', 'json', etc.
    });

    return response;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}

// Usage example
(async () => {
  try {
    const transcription = await transcribeAudio('test.mp3');
    console.log('Transcription:', transcription);
  } catch (error) {
    console.error('Error:', error);
  }
})();
