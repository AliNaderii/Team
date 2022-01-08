// tools
import { Link } from 'react-router-dom';

// styles
import './Card.css';

export default function Card({ projects }) {

  return (
    <div className='card-container'>
      { projects && projects.map(project => (
        <Link to={ `/project/${project.id}` } key={ project.id }>
          <h4>{ project.title }</h4>
          <p>Due by: { project.dueDate.toDate().toDateString() }</p>
          <div className="assigned-to">
            <p><strong>Assigned to:</strong></p>
            <ul className='card' >
              { project.assignedTo.map(user => (
                <li key={ project.id }>
                  <img src={ user.photoURL } alt="avatar" className='thumb' key={ user.photoURL } />
                </li>
              )) }
            </ul>
          </div>
        </Link>
      ))
      }
    </div >
  );
}
