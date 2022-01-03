// tools
import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  // hook states
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  // auth context values
  const { dispatch } = useAuthContext();
  // cleanup function state
  const [ isCancelled, setIsCanacelled ] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // logout the user
    try {
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