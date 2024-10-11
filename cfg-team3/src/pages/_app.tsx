import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginStateProvider } from "@/features/auth/LoginStateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LoginStateProvider>
        <Component {...pageProps} />
      </LoginStateProvider>
    </ChakraProvider>
  );
}
