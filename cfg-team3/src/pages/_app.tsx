import "@/styles/globals.css";
import "@/styles/inventory.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { LoginStateProvider } from "@/features/auth/LoginStateContext";
import { ReaderProvider } from "@/features/reader/ReaderContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ReaderProvider>
        <LoginStateProvider>
          <Stack spacing={0} minH="$100vh">
            <Component {...pageProps} />
          </Stack>
        </LoginStateProvider>
      </ReaderProvider>
    </ChakraProvider>
  );
}
