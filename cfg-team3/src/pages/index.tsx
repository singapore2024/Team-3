import WithSubnavigation from "@/components/Navbar";
import { Grid, Box, Text, Button, VStack } from "@chakra-ui/react";
import Router from "next/router";
import { recipes } from "@/fakeDB/recipes";
import { Image } from "@chakra-ui/react";
import withNoSSR from "@/components/WithNoSSR";
import { useReader } from "@/features/reader/ReaderContext";

export function Home() {
  const { isReaderMode } = useReader();

  const handleMoodClick = () => {
    Router.push("/mood");
  };

  return (
    <>
      <WithSubnavigation />
      <Box maxHeight="100vh" overflowY="auto" padding="4">
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {recipes.map((recipe, index) => (
            <VStack
              key={index + 1}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              cursor="pointer"
              onClick={() => {
                if (isReaderMode) {
                  const to_speak = new SpeechSynthesisUtterance(recipe.title);
                  window.speechSynthesis.speak(to_speak);
                } else {
                  Router.push(`/recipe/${index + 1}`);
                }
              }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontWeight="bold"
                fontSize="2rem"
                textAlign="center"
                noOfLines={2}
              >
                {recipe.title}
              </Text>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2} // Add some margin between text and image
                width="100%"
              >
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  objectFit="cover" // Ensures the image maintains its aspect ratio
                  w="300px"
                  h="250px"
                />
              </Box>
            </VStack>
          ))}
        </Grid>

        {/* Floating Mood Button */}
        <Button
          position="fixed"
          bottom="4"
          right="4"
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          onClick={handleMoodClick}
          zIndex={1000}
        >
          Mood 😊
        </Button>
      </Box>
    </>
  );
}

export default withNoSSR(Home);
