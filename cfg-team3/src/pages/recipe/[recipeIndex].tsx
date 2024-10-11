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
  Divider,
  HStack,
  Progress,
} from "@chakra-ui/react";
import withNoSSR from "@/components/WithNoSSR";
import { useReader } from "@/features/reader/ReaderContext";

export function RecipePage() {
  const router = useRouter();
  const recipeIndex = router.query.recipeIndex;

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<{
    name: string;
    description: string;
    time?: number;
  } | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const { isReaderMode } = useReader();

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) =>
          prevTime && prevTime > 0 ? prevTime - 1 : 0
        );
      }, 1000);
    }

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

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
    if (isReaderMode) {
      const speak_name = new SpeechSynthesisUtterance(task.name);
      window.speechSynthesis.speak(speak_name);
      const speak_description = new SpeechSynthesisUtterance(task.description);
      window.speechSynthesis.speak(speak_description);
      return;
    }
    setSelectedTask(task); // Set the clicked task
    if (task.time) {
      setTimeLeft(task.time * 60); // Reset the countdown timer
    }
    setIsRunning(false); // Pause timer initially
    onOpen(); // Open the modal
  };

  // Convert seconds to minutes and seconds format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Complete task inside the modal and reflect on the main list
  const handleCompleteTaskInModal = () => {
    const taskIndex = tasks.findIndex(
      (task) => task.name === selectedTask?.name
    );
    if (taskIndex !== -1) {
      setCompletedTasks((prev) => {
        const newSet = new Set(prev);
        newSet.add(taskIndex);
        return newSet;
      });
      onClose(); // Close modal after marking task as completed
    }
  };

  return (
    <>
      <WithSubnavigation />
      <Stack spacing={4} p={4}>
        <Text fontWeight="bold" fontSize="3rem" textAlign="center">
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
              w="300px"
              bg={completedTasks.has(index) ? "green.100" : "white"}
              flexShrink={0}
              onClick={() => handleTaskClick(task)} // Handle task click
              cursor="pointer"
            >
              <Box h="15rem">
                <Text fontWeight="bold" fontSize="2rem">
                  {task.name}
                </Text>
                <Text mt={2} fontSize="1.5rem">
                  {task.description}
                </Text>
                <Text mt={2} fontStyle="italic">
                  {task.time} mins
                </Text>
              </Box>
              <Divider />
              <HStack w="full" alignItems="center" justifyContent="center">
                <Button
                  color="black"
                  size="lg"
                  mt={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCompletedTasks((prev) => {
                      const newSet = new Set(prev);
                      if (newSet.has(index)) {
                        newSet.delete(index);
                      } else {
                        newSet.add(index);
                      }
                      return newSet;
                    });
                  }}
                >
                  {completedTasks.has(index) ? "Completed" : "Complete"}
                </Button>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Stack>

      {/* Modal for task details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3rem">{selectedTask?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2rem">{selectedTask?.description}</Text>
            {/* Display countdown timer */}
            <Text mt={4} fontSize="2rem" color="red.500">
              {timeLeft && timeLeft > 0
                ? `Time left: ${formatTime(timeLeft)}`
                : "Time's up!"}
            </Text>

            {/* Progress bar */}
            {selectedTask?.time && (
              <Progress
                mt={4}
                value={((timeLeft ?? 0) / (selectedTask.time * 60)) * 100}
                colorScheme="green"
                size="lg"
                borderRadius="md"
              />
            )}

            {/* Timer controls */}
            <HStack mt={4} justifyContent="space-between">
              <Button
                colorScheme="green"
                size="lg"
                onClick={() => setIsRunning(true)}
                isDisabled={isRunning}
              >
                Start
              </Button>
              <Button
                size="lg"
                colorScheme="yellow"
                onClick={() => setIsRunning(false)}
                isDisabled={!isRunning}
              >
                Pause
              </Button>
              <Button
                size="lg"
                colorScheme="red"
                onClick={() => {
                  if (selectedTask?.time) setTimeLeft(selectedTask.time * 60);
                  setIsRunning(false);
                }}
              >
                Reset
              </Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="black"
              color="white"
              mr={3}
              onClick={handleCompleteTaskInModal}
              isDisabled={completedTasks.has(
                tasks.findIndex((task) => task.name === selectedTask?.name)
              )}
            >
              Complete Task
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default withNoSSR(RecipePage);
