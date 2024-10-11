import { useState, useEffect } from "react";
import WithSubnavigation from "@/components/Navbar";
import { useRouter } from "next/router";
import { recipes } from "@/fakeDB/recipes";
import {
  Stack,
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function RecipePage() {
  const router = useRouter();
  const recipeIndex = router.query.recipeIndex;

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<{
    name: string;
    description: string;
    time?: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Time left in seconds

  // Countdown timer effect
  useEffect(() => {
    if (isOpen && timeLeft && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) =>
          prevTime ? (prevTime > 0 ? prevTime - 1 : 0) : 0
        );
      }, 1000);

      // Cleanup interval on modal close or when time reaches 0
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  // Return a "Recipe not found" page if the index is invalid
  if (!recipeIndex || Number(recipeIndex) > recipes.length) {
    return (
      <>
        <WithSubnavigation />
        <h1>Recipe not found</h1>
      </>
    );
  }

  const recipe = recipes[Number(recipeIndex) - 1];
  const tasks = recipe.tasks;

  // Handle task click
  const handleTaskClick = (task: {
    name: string;
    description: string;
    time?: number;
  }) => {
    setSelectedTask(task); // Set the clicked task
    if (task.time) setTimeLeft(task.time * 60); // Reset the countdown timer
    onOpen(); // Open the modal
  };

  // Convert seconds to minutes and seconds format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <WithSubnavigation />
      <Stack spacing={4} p={4}>
        <Text fontWeight="bold" fontSize="2rem">
          {recipe.title}
        </Text>

        {/* Container for tasks in a horizontal row */}
        <Flex direction="row" overflowX="auto" gap={4}>
          {tasks.map((task, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              w="250px"
              bg="gray.50"
              flexShrink={0}
              onClick={() => handleTaskClick(task)} // Handle task click
              cursor="pointer"
            >
              <Text fontWeight="bold" fontSize="1.5rem">
                {task.name}
              </Text>
              <Text mt={2} fontSize="1rem">
                {task.description}
              </Text>
              <Text mt={2} fontStyle="italic">
                {task.time} mins
              </Text>
            </Box>
          ))}
        </Flex>
      </Stack>

      {/* Modal for task details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTask?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedTask?.description}</Text>
            <Text mt={4} fontWeight="bold">
              Time: {selectedTask?.time} mins
            </Text>
            {/* Display countdown timer */}
            <Text mt={4} fontSize="xl" color="red.500">
              {timeLeft && timeLeft > 0
                ? `Time left: ${formatTime(timeLeft)}`
                : "Time's up!"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
