import OpenAI from 'openai';
import dotenv from 'dotenv';

// get api key from env file
dotenv.config({ path: '.env' });
const api_key = process.env.OPENAI_API_KEY;


const openai = new OpenAI({
  apiKey: api_key,
});


async function filterAndSimplifyCustomerText(message: string) { 
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'You are an AI assistant that helps refine and polish messages from people with disabilities while preserving the original intent. Your task is to take messages from users, which may be incomplete, incoherent, or unclear, and rephrase them to be polite, clear, and friendly. Ensure that the message is respectful and socially appropriate while maintaining the users original meaning and emotions. Avoid adding new information or making assumptions; focus only on improving the clarity, structure, and tone of the existing message.' 
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
