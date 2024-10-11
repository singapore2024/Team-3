import {
  createContext,
  useContext,
  type PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ReaderContextReturn = {
  isReaderMode: boolean;
  setReaderMode: Dispatch<SetStateAction<boolean>>;
};

// Exported for testing.
export const ReaderContext = createContext<ReaderContextReturn | null>(null);

/**
 * Provider component that wraps your app and makes client login state boolean available
 * to any child component that calls `useReader()`.
 */
export const ReaderProvider = ({ children }: PropsWithChildren) => {
  const Reader = useProvideReader();

  return (
    <ReaderContext.Provider value={Reader}>{children}</ReaderContext.Provider>
  );
};

/**
 * Hook for components nested in ReaderProvider component to get the current login state.
 */
export const useReader = (): ReaderContextReturn => {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error(`useReader must be used within a ReaderProvider component`);
  }
  return context;
};

const useProvideReader = () => {
  const [isReaderMode, setReaderMode] = useState<boolean>(false);

  return {
    isReaderMode,
    setReaderMode,
  };
};
