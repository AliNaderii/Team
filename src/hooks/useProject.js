// tools
import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export const useProject = (collection, id) => {
  // hook states
  const [ project, setProject ] = useState(null);
  const [ error, setError ] = useState(null);

  // realtime project data
  useEffect(() => {
    // project refrence
    const ref = projectFirestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(snapshot => {
      // need to make sure the project exists & has data
      if (snapshot.data()) {
        setProject({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      }
      else {
        setError('No such project exists');
      }
    },
      // catch errors
      (error) => {
        console.log(error);
      }
    );

    // unsubscribe on unmount
    return () => unsub();

  }, [ collection, id ]);


  return { error, project };
};