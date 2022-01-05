// tools
import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useProject = (collection, id) => {
  // hook states
  const [ project, setProject ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isPending, setIsPending ] = useState(false);
  // cleanup function state
  const [ isCancelled, setIsCancelled ] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      setError(null);
      setIsPending(true);

      // get the project from
      try {
        const res = await projectFirestore.collection(collection).doc(id).get();
        if (!res) {
          throw new Error('Could not fetch the project from database');
        }

        // update states if component is not unmounted
        if (!isCancelled) {
          setProject(res.data());
          setError(null);
          setIsPending(false);
        }
      }
      // catch errors
      catch (err) {
        console.log(err.message);
        // update states if component is not unmounted
        if (!isCancelled) {
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    getProject();

    // cleanup function
    return () => setIsCancelled(true);

  }, [ collection, id, isCancelled ]);


  return { error, isPending, project };
};