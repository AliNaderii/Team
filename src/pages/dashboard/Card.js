// tools
import { Link } from 'react-router-dom';

// styles
import './Card.css';

export default function Card({ projects }) {

  return (
    <div className='card-container'>
      <Link to='/'>
        { projects && projects.map(project => (
          <div className='card'>
            <h4>{ project.title }</h4>
            <p>Due by: { project.dueDate.toDate().toDateString() }</p>
            { project.assignedTo.map(user => (
              <img src={ user.photoURL } alt="avatar" className='thumb' />
            )) }
          </div>
        )) }
      </Link>
    </div >
  );
}
