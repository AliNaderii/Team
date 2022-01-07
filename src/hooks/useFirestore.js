// tools
import { useState, useEffect, useReducer } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const initialState = {
  isPending: false,
  error: null,
  success: null,
  project: null
};

// reducer function 
const projectReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true, error: null, success: false, project: null
      };
    case 'ERROR':
      return {
        isPending: false, error: action.payload, success: false, project: null
      };
    case 'ADD_PROJECT':
      return {
        isPending: false, error: null, success: true, project: action.payload
      };
    case 'UPDATE':
      return {
        isPending: false, error: null, success: true, project: action.payload
      };
    // case 'DELETE_PROJECT':
    //   return {
    //     isPending: false, error: null, success: true, project: null
    //   };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  // useReducer hook
  const [ state, dispatch ] = useReducer(projectReducer, initialState);
  // collection refrence
  const ref = projectFirestore.collection(collection);
  // cleanup function state
  const [ isCancelled, setIsCancelled ] = useState(false);

  // dispatch updates if component is still mounted
  const dispatchIfStillMounted = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add project
  const add = async (project) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const res = await ref.add({ ...project, createdAt });
      // if anything went wrong
      if (!res) {
        throw new Error('Something went wrong');
      }

      // upadate hook states if it's not unmounted
      dispatchIfStillMounted({ type: 'ADD_PROJECT', payload: res });
    }
    // catch any errors
    catch (err) {
      console.log(err.message);
      // update hook states if it's not unmounted
      dispatchIfStillMounted({ type: 'ERROR', payload: err.message });
    }
  };

  // update project
  const update = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const res = await projectFirestore.collection(collection).doc(id).update(updates);

      // upadate hook states if it's notunmounted
      dispatchIfStillMounted({ type: 'UPDATE', payload: res });
    }
    // catch any error
    catch (err) {
      console.log(err.message);
      // update hook states if it's not unmounted
      dispatchIfStillMounted({ type: 'ERROR', payload: err.message });
    }
  };

  // // delete a project
  // const deleteProject = async (id) => {
  //   dispatch({ type: 'IS_PENDING' });

  //   try {
  //     await ref.doc(id).delete();

  //     // update hook states if it's not unmounted
  //     dispatchIfStillMounted({ type: 'DELETE_PROJECT' });
  //   }
  //   // catch any errors
  //   catch (err) {
  //     console.log(err.message);
  //     // update hook states if it's not unmounted
  //     dispatchIfStillMounted({ type: 'ERROR', payload: 'could not delete' });
  //   }
  // };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { add, update, state };
};