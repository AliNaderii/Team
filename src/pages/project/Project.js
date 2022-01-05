// tools
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

// styles
import './Project.css';

export default function Project() {
  // component states
  const [ project, setProject ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isCancelled, setIsCancelled ] = useState(false);

  // useParams hook values
  const { id } = useParams();

  useEffect(() => {
    // get the project from database
    const getProject = async () => {
      setError(null);
      setProject(null);

      try {
        const res = await projectFirestore.collection('projects').doc(id).get();
        if (!res) {
          throw new Error('Could not fetch the project from database');
        }

        if (!isCancelled) {
          setProject(res.data());
          setError(null);
        }

      }
      // catch errors
      catch (err) {
        console.log(err.message);
        if (!isCancelled) {
          setError(err.message);
        }
      }
    };

    getProject();

    return () => setIsCancelled(true);
  }, [ id, isCancelled ]);

  console.log(project, error);

  return (
    <div className='project-container'>
      { project && (
        <div className='project-card'>
          <h3>{ project.title }</h3>
          <p className='creator'>By { project.createdBy.displayName }</p>
          <p className='due'>Project due by { project.dueDate.toDate().toDateString() }</p>
          <p className='details'>{ project.details }</p>
          <p className='assigned-to'>Project assigned to:</p>
          { project.assignedTo.map(user => (
            <img className='thumb' src={ user.photoURL } alt='avatar' key={ user.photoURL } />
          )) }
        </div>
      ) }
      { !project && <p>Please wait a moment ...</p> }
      { error && <p className='error'>{ error }</p> }
    </div>
  );
}
