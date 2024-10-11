import WithSubnavigation from "@/components/Navbar";
import { useMe } from "@/hooks/useMe";
import { Grid, Box, Text, Button } from "@chakra-ui/react";
import Router from "next/router";
import { recipes } from "@/fakeDB/recipes";
import { Image } from "@chakra-ui/react";

export default function Home() {
  const { me } = useMe();

  const handleMoodClick = () => {
    Router.push("/mood");
  };

  return (
    <>
      <WithSubnavigation />
      <Box maxHeight="100vh" overflowY="auto" padding="4">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {recipes.map((recipe, index) => (
            <Box
              key={index + 1}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              onClick={() => Router.push(`/recipe/${index + 1}`)}
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold" textAlign="center" noOfLines={1}>
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
                  boxSize="250px" // You can set fixed dimensions or make it responsive
                />
              </Box>
            </Box>
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