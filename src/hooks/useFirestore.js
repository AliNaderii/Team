// tools
import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useFirestore = (collection) => {
  // hooks states
  const [ error, setError ] = useState(null);
  const [ isPending, setIsPending ] = useState(false);
  // cleanup function state
  const [ isCancelled, setIsCancelled ] = useState(false);

  // add project
  const add = async (project) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectFirestore.collection(collection).add(project);
      // if anything went wrong
      if (!res) {
        throw new Error('Something went wrong');
      }

      // upadate hook states if it's notunmounted
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    }
    // catch any errors
    catch (err) {
      console.log(err.message);
      // update hook states if it's not unmounted
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { add, error, isPending };
};