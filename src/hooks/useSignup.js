// tools
import { projectAuth, projectStorage } from "../firebase/config";
import { useState, useEffect } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);
  // auth context values
  const { dispatch } = useAuthContext();
  // cleanup function state
  const [ isCancelled, setIsCancelled ] = useState(false);

  const signup = async (email, password, displayName, avatar) => {
    setIsPending(true);
    setError(null);

    // signup the user
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);

      // if anything went wrong during signup 
      if (!res) {
        throw new Error('Something went wrong');
      }

      // upload uset avatar
      const uploadPath = projectStorage.ref(`avatars/${res.user.uid}/${avatar.name}`);
      const image = await uploadPath.put(avatar);
      const imageURL = await image.ref.getDownloadURL();

      // update user displayName & photoURL
      await res.user.updateProfile({ displayName, photoURL: imageURL });

      // dispatch the new state
      dispatch({ type: 'LOGIN', payload: res.user });

      // update hook state if it's not unmounted
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

  return { signup, error, isPending };
};