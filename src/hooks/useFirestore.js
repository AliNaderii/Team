// tools
import { useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

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
      const createdAt = timestamp.fromDate(new Date());
      const res = await projectFirestore.collection(collection).add({ ...project, createdAt });
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

  // update project
  const update = async (id, updates) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectFirestore.collection(collection).doc(id).update(updates);

      // upadate hook states if it's notunmounted
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
      return res;
    }
    catch (err) {
      console.log(err.message);
      // update hook states if it's not unmounted
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
      return null;
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { add, update, error, isPending };
};