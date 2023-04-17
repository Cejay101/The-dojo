import { useState, useEffect, useRef } from "react";
import { projectFirebase } from "../firebase/config";

export default function useCollection(collection, _query, _orderby) {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);
  const query = useRef(_query).current;
  const orderby = useRef(_orderby).current;
  useEffect(() => {
    let ref = projectFirebase.collection(collection);
    if (query) {
      ref = ref.where(...query);
    }
    if (orderby) {
      ref = ref.orderBy(...orderby);
    }
    if (query) {
      ref = ref.where(...query);
    }
    const unSubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        // update states
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch data");
      }
    );
    //unsubscribe on unmount
    return () => unSubscribe();
  }, [collection, query, orderby]);
  return { documents, error };
}
