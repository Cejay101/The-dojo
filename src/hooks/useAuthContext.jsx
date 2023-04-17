import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be inside a context Provider");
  }
  // console.log(context)
  return context;
}
