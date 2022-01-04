// tools
import { projectFirestore } from "../firebase/config";
import { useState, useEffect } from 'react';

export const useCollection = (collection) => {
  // hook states
  const [ error, setError ] = useState(null);
  const [ data, setData ] = useState(null);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).onSnapshot(
      snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        // update states
        setData(results);
        setError(null);
      },
      // catch error
      error => {
        console.log(error);
        setError('Could not fetch the data');
      }
    );

    // unsubscribe on unmoumt
    return () => unsub();
  }, [ collection ]);

  return { data, error };
};