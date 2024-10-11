'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  Container,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { MdMic, MdSend, MdVolumeUp } from 'react-icons/md'
import { FaSun, FaMoon } from 'react-icons/fa'

type Message = {
  text: string
  isUser: boolean
}

  // Function to make a POST request to the server
  const processCustomerMessage = async (message: string) => {
    const response = await fetch('http://localhost:3001/processCustomerMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }), // Send the message as JSON
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.text();
    console.log('data', data)
    return data; // Process the response as needed
  };

export default function AccessibleChatWithSpeech() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const recognition = useRef<SpeechRecognition | null>(null)
  const synthesis = useRef<SpeechSynthesis | null>(null)

  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const userMsgBg = useColorModeValue('blue.100', 'blue.700')
  const botMsgBg = useColorModeValue('gray.100', 'gray.700')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognition.current = new SpeechRecognition()
        recognition.current.continuous = true
        recognition.current.interimResults = true

        recognition.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

          setInputText(transcript)
        }

        recognition.current.onerror = (event) => {
          console.error('Speech recognition error', event.error)
          toast({
            title: 'Speech Recognition Error',
            description: `Error: ${event.error}. Please try again.`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setIsListening(false)
        }

        recognition.current.onend = () => {
          setIsListening(false)
        }
      } else {
        console.warn('Speech recognition not supported')
        toast({
          title: 'Speech Recognition Not Supported',
          description: 'Your browser does not support speech recognition. Please try a different browser.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      }

      synthesis.current = window.speechSynthesis
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop()
      }
    }
  }, [toast])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (inputText.trim()) {
      setInputText('')
      // Here you would typically send the message to a backend or AI service
      // For this example, we'll just echo the message back
      const response = await processCustomerMessage(inputText)
      const responseText = response.split(":")[1]
      setMessages(prev => [...prev, {
        text: responseText,
        isUser: true,
      }])
    }
  }

  const toggleListening = () => {
    if (!recognition.current) {
      toast({
        title: 'Speech Recognition Not Available',
        description: 'Speech recognition is not supported in your browser.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (isListening) {
      recognition.current.stop()
    } else {
      recognition.current.start()
      setIsListening(true)
    }
  }

  const speakLastMessage = () => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && synthesis.current) {
      const utterance = new SpeechSynthesisUtterance(lastMessage.text)
      synthesis.current.speak(utterance)
    }
  }

  return (
    <Container maxW="2xl" h="100vh" py={6}>
      <Flex direction="column" h="full" bg={bg} color={color}>
        <Flex justifyContent="flex-end" mb={4}>
          <IconButton
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            size="lg"
          />
        </Flex>
        <Box
          ref={scrollAreaRef}
          flex="1"
          overflowY="auto"
          borderWidth={2}
          borderColor={borderColor}
          borderRadius="lg"
          p={4}
          mb={6}
        >
          <VStack spacing={4} align="stretch">
            {messages.map((message, index) => (
              <Box
                key={index}
                bg={message.isUser ? userMsgBg : botMsgBg}
                color={color}
                p={4}
                borderRadius="lg"
                maxW="80%"
                alignSelf={message.isUser ? "flex-end" : "flex-start"}
                fontSize="xl"
                role="log"
                aria-live="polite"
              >
                <Text>{message.text}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Flex direction={['column', 'row']} gap={4}>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            size="lg"
            fontSize="xl"
            ref={inputRef}
            aria-label="Message input"
          />
          <Flex gap={4}>
            <Button onClick={handleSend} size="lg" leftIcon={<MdSend />} aria-label="Send message">
              Send
            </Button>
            <Button
              onClick={toggleListening}
              size="lg"
              leftIcon={<MdMic />}
              colorScheme={isListening ? "red" : "blue"}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? 'Stop' : 'Listen'}
            </Button>
            <Button onClick={speakLastMessage} size="lg" leftIcon={<MdVolumeUp />} aria-label="Speak last message">
              Speak
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
