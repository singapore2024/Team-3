import { useState, useEffect } from 'react';

// Your component
export default function AccessibleChatWithSpeech() {
  const [voiceMessage, setVoiceMessage] = useState('');

  const fetchVoiceMessage = async () => {
    try {
      const response = await fetch('http://localhost:3000/processStaffVoiceMessage');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVoiceMessage(data.message); // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching voice message:', error);
    }
  };

  useEffect(() => {
    fetchVoiceMessage();
  }, []); // Empty dependency array means this runs once when the component mounts
}
