import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { LoginStateProvider } from "@/features/auth/LoginStateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LoginStateProvider>
        <Stack spacing={0} minH="$100vh">
          <Component {...pageProps} />
        </Stack>
      </LoginStateProvider>
    </ChakraProvider>
  );
}
