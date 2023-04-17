import { projectAuth } from "../firebase/config";
import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";
// import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const Logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });

      //update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        isPending(false);
      }
    }
  };
  useEffect(()=>{
    return (()=>setIsCancelled(true))
  },[])

  return { error, isPending, Logout };
};
