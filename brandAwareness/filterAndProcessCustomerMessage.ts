import OpenAI from 'openai';
import dotenv from 'dotenv';

// get api key from env file
dotenv.config({ path: '.env' });
const api_key = process.env.OPENAI_API_KEY;


const openai = new OpenAI({
  apiKey: api_key,
});


async function filterAndSimplifyText(message: string) { 
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

// const text = "The food was delicious. Good job";

// filterAndSimplifyText(text).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error('Error:', error);
// });
