import { useCallback } from "react";
import Router from "next/router";
import { useLocalStorage } from "usehooks-ts";

export const useMe = () => {
  const me = {
    name: "John Doe",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, removeLoginStateFlag] = useLocalStorage<boolean>(
    "IS_LOGGED_IN",
    false
  );

  const logout = useCallback(
    (redirectToSignIn = true) => {
      return () => {
        // call logout endpoint to remove cookie
        removeLoginStateFlag();
        if (redirectToSignIn) {
          Router.push("/sign-in");
        }
      };
    },
    [removeLoginStateFlag]
  );

  return { me, logout };
};
