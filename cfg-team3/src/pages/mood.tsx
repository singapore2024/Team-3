import { useState } from "react";
import { useRouter } from "next/router";
import WithSubnavigation from "@/components/Navbar";
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";

// Define the mood types
interface Mood {
  name: string;
  emoji: string;
  color: string;
}

const moods: Mood[] = [
  { name: "Happy", emoji: "😊", color: "yellow.400" },
  { name: "Sad", emoji: "😢", color: "blue.400" },
  { name: "Excited", emoji: "🎉", color: "pink.400" },
  { name: "Angry", emoji: "😠", color: "red.400" },
  { name: "Calm", emoji: "😌", color: "green.400" },
  { name: "Anxious", emoji: "😰", color: "purple.400" },
  { name: "Tired", emoji: "😴", color: "gray.400" },
  { name: "Confused", emoji: "🤔", color: "orange.400" },
];

export default function MoodsPage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      console.log("the mood selected is: " + selectedMood);
      toast({
        title: "Mood recorded",
        description: `You're feeling ${selectedMood.name} ${selectedMood.emoji}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } else {
      toast({
        title: "No mood selected",
        description: "Please select a mood before submitting",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <WithSubnavigation />
      <VStack spacing={8} p={8}>
        <Heading as="h1" size="xl">
          How are you feeling today?
        </Heading>
        <SimpleGrid columns={[2, null, 4]} spacing={6}>
          {moods.map((mood) => (
            <Box
              key={mood.name}
              bg={selectedMood?.name === mood.name ? mood.color : "gray.100"}
              w="150px"
              h="150px"
              borderRadius="lg"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => handleMoodSelect(mood)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Text fontSize="4xl">{mood.emoji}</Text>
              <Text mt={2} fontWeight="bold">
                {mood.name}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleSubmit}
          isDisabled={!selectedMood}
        >
          Submit
        </Button>
      </VStack>
    </>
  );
}
