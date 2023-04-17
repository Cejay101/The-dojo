import { useReducer, useEffect, useState } from "react";
import { projectFirebase, timeStamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };
    case "ERROR":
      return {
        isPending: false,
        success: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        success: true,
        error: null,
        isPending: false,
      };
      case "DELETED_DOCUMENT":
        return{
          document:null,
          error:null,
          isPending:false,
          success:true,
        }
    default:
      return state;
  }
};
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirebase.collection(collection);
  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedAt = timeStamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, addedAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };
  //delete document
  const deleteDocument = async (id) => {
    dispatch({type:"IS_PENDING"})
    try {
    await ref.doc(id).delete()
      dispatchIfNotCancelled({type:"DELETED_DOCUMENT"})
      
    } catch (error) {
      dispatchIfNotCancelled({type:"Error", payload:"Could not delete"})
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  },[]);
  return { addDocument, deleteDocument, response };
};
