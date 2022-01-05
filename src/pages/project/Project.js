// tools
import { useParams } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';

// styles && components
import Comments from './Comments';
import './Project.css';

export default function Project() {
  // useParams hook values
  const { id } = useParams();
  // useProject hook values
  const { error, isPending, project } = useProject('projects', id);

  return (
    <div className='project-container'>
      {/* project details */ }
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
      {/* comments */ }
      { project && (
        <Comments id={ id } />
      ) }
      {/* messages */ }
      { isPending && <p>Please wait a moment ...</p> }
      { error && <p className='error'>{ error }</p> }
    </div>
  );
}
