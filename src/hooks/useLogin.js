// tools
import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export const useLogin = () => {
  // hook states
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  // auth context values
  const { dispatch } = useAuthContext();
  // cleanup function states
  const [ isCancelled, setIsCancelled ] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // login the user
    try {
      // login the user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // change online status
      const { uid } = projectAuth.currentUser;
      await projectFirestore.collection('users').doc(uid).update({
        online: true
      });

      // if anything went wrong
      if (!res) {
        throw new Error('Something went wrong');
      }

      // dispatch new state
      dispatch({ type: 'LOGIN', payload: res.user });

      // update hook states if it's not unmounted
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

  return { login, error, isPending };
};