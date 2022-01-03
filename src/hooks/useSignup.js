// tools
import { projectAuth, projectStorage } from "../firebase/config";
import { useState } from 'react';

export const useSignup = () => {
  const [ isPending, setIsPending ] = useState(false);
  const [ error, setError ] = useState(null);

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

      setError(null);
      setIsPending(false);
    }
    // catch any errors
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};