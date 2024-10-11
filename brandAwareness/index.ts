import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import * as fs from 'fs';

// Load environment variables from .env file
dotenv.config({ path: '.env' });
const api_key = process.env.OPENAI_API_KEY;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: api_key,
});

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Function to filter and simplify staff text
async function filterAndSimplifyStaffText(message: string) { 
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant that simplifies and transforms messages to be constructive, positive, and easy to understand. Your task is to take any message and rephrase it to be friendly and encouraging, avoiding negative or judgmental language. The simplified message should be accessible and suitable for people with disabilities, such as autism and cerebral palsy. Do not give advice or suggest anything new; instead, focus on rephrasing the original message in a positive and simple manner.' 
        },
        { 
          role: 'user', 
          content: message 
        },
      ],
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error filtering message:', error);
    throw error;
  }
}

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

// Define the /processCustomerMessage route
app.post('/processCustomerMessage', async (req: Request, res: Response) => {
  const { text } = req.body;
  if (text) {
    try {
      const simplifiedMessage = await filterAndSimplifyStaffText(text);
      res.send(`Received and simplified message: ${simplifiedMessage}`);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('Bad Request: Missing "text" parameter');
  }
});

// Define the /processStaffVoiceMessage
app.get('/processStaffVoiceMessage', async (req: Request, res: Response) => {
  // const { audioFile } = req.query;
  try {
    const transcription = await transcribeAudio("test.mp3");
    const transcribedMessage = await filterAndSimplifyStaffText(transcription);
    res.send(` ${transcribedMessage}`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


// Start the server and listen on a specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});