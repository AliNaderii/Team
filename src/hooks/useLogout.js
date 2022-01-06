// tools
import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { projectFirestore } from '../firebase/config';

export const useLogout = () => {
  // hook states
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  // auth context values
  const { user, dispatch } = useAuthContext();
  // cleanup function state
  const [ isCancelled, setIsCanacelled ] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // logout the user
    try {
      // change the online status
      const { uid } = user;
      await projectFirestore.collection('users').doc(uid).update({
        online: false
      });

      // logout the user
      await projectAuth.signOut();

      // dispatch the new state
      dispatch({ type: 'LOGOUT' });

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

  useEffect(() => {
    return () => setIsCanacelled(true);
  }, []);

  return { logout, error, isPending };
};