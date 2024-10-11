import { useLoginState } from "@/features/auth/LoginStateContext";
import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import Image from 'next/image'
import Router from "next/router";
import { useState } from "react";

const SignInPage = () => {
  return (
    <Flex flex={1} flexDir="column" minH="100vh">
      <Grid
        templateRows={{ base: "1fr auto", md: "auto 1fr auto", lg: "1fr auto" }}
        columnGap={{ base: "0.5rem", lg: "1rem" }}
        templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(12, 1fr)" }}
        gap={6}
        w="100%"
        h="100vh"
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
          <Image
            src='/fortitude-image.png'
            alt="Fortitude Image"
            width={500}
            height={500}
          />
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
          w="24rem"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          w="24rem"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="black"
          w="24rem"
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
