import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import useAuthContext from "./useAuthContext";

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      //Sign up user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // console.log(res.user)
      if (!res) {
        throw new Error("could not sign up new user");
      }

      //Add Username
      await res.user.updateProfile({ displayName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //update states
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { error, isPending, signup };
}
