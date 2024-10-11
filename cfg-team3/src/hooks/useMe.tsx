import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useMe = () => {
  const me = {
    name: "John Doe",
  };

  // redirect to login page if not logged in?

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, removeLoginStateFlag] = useLocalStorage<boolean>(
    "IS_LOGGED_IN",
    false
  );

  const logout = useCallback(() => {
    return () => {
      // call logout endpoint to remove cookie
      removeLoginStateFlag();
    };
  }, [removeLoginStateFlag]);

  return { me, logout };
};
