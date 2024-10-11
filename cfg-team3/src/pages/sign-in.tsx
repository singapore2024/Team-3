import { useLoginState } from "@/features/auth/LoginStateContext";
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";

const SignInPage = () => {
  return (
    <Flex flexDir="column" h="inherit" minH="$100vh">
      <Grid
        templateRows={{ base: "1fr auto", md: "auto 1fr auto", lg: "1fr auto" }}
        columnGap={{ base: "0.5rem", lg: "1rem" }}
        templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(12, 1fr)" }}
        gap={6}
        w="100%"
        h="100%"
        p={4}
        alignItems="center"
        justifyContent="center"
      >
        <GridItem
          display={{ base: "none", md: "flex" }}
          gridColumn={{ md: "1 / 13", lg: "1 / 7" }}
          h={{ md: "9.5rem", lg: "auto" }}
          py="1rem"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          bg="base.canvas.brand-subtle"
          ml={{ md: "-1.75rem", lg: "-2rem" }}
          mr={{ md: "-1.75rem", lg: 0 }}
        >
          <Text>Metropolitan</Text>
        </GridItem>
        <SignIn />
      </Grid>
    </Flex>
  );
};

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { hasLoginStateFlag, setHasLoginStateFlag } = useLoginState();
  if (hasLoginStateFlag) {
    Router.push("/");
  }
  return (
    <GridItem
      gridColumn={{ base: "1 / 5", md: "2 / 12", lg: "8 / 12" }}
      py="2rem"
      display="flex"
      justifyContent="center"
      alignItems={{ lg: "center" }}
    >
      <VStack spacing={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={async () => {
            // Placeholder for sign-in logic
            const res = await fetch("/api/sign-in");
            if (res.ok) {
              setHasLoginStateFlag();
            }
          }}
        >
          Sign In
        </Button>
      </VStack>
    </GridItem>
  );
};

export default SignInPage;
