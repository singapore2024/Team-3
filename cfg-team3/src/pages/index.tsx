import WithSubnavigation from "@/components/Navbar";
import { useMe } from "@/hooks/useMe";
import { Grid, Box, Text } from "@chakra-ui/react";
import Router from "next/router";
import { recipes } from "@/fakeDB/recipes";

export default function Home() {
  const { me } = useMe();

  return (
    <>
      <WithSubnavigation />
      <Box maxHeight="80vh" overflowY="auto" padding="4">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {recipes.map((recipe, index) => (
            <Box
              key={index + 1}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              onClick={() => Router.push(`/recipe/${index + 1}`)}
            >
              <Text fontWeight="bold">{recipe.title}</Text>
              {recipe.tasks.length > 0 && (
                <Box mt={2}>
                  {recipe.tasks.map((task, taskIndex) => (
                    <Text key={taskIndex}>
                      {task.name}: {task.description} ({task.time} mins)
                    </Text>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}
