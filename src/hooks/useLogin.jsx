import { projectAuth } from "../firebase/config";
import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
// import { useAuthContext } from "./useAuthContext";
export const useLogin= () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const Login = async (email,password) => {
    setError(null);
    setIsPending(true);
    try {
      const res =await projectAuth.signInWithEmailAndPassword(email,password);
      dispatch({ type: "LOGIN", payload:res.user });

      //update state
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

  return { error, isPending, Login };
};
