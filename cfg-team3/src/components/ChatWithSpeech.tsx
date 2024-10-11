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
} from '@chakra-ui/react'
import { MdMic, MdSend, MdVolumeUp } from 'react-icons/md'
import { FaSun, FaMoon } from 'react-icons/fa'

type Message = {
  text: string
  isUser: boolean
}

export default function AccessibleChatWithSpeech() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const recognition = useRef<SpeechRecognition | null>(null)
  const synthesis = useRef<SpeechSynthesis | null>(null)

  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('black', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const userMsgBg = useColorModeValue('blue.100', 'blue.700')
  const botMsgBg = useColorModeValue('gray.100', 'gray.700')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.current.continuous = true
      recognition.current.interimResults = true

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')

        setInputText(transcript)
      }

      synthesis.current = window.speechSynthesis
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = { text: inputText, isUser: true }
      setMessages(prev => [...prev, newMessage])
      setInputText('')
      // Here you would typically send the message to a backend or AI service
      // For this example, we'll just echo the message back
      setTimeout(() => {
        const response: Message = { text: `You said: ${inputText}`, isUser: false }
        setMessages(prev => [...prev, response])
      }, 1000)
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop()
    } else {
      recognition.current?.start()
    }
    setIsListening(!isListening)
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