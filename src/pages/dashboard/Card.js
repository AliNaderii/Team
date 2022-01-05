// tools
import { Link } from 'react-router-dom';

// styles
import './Card.css';

export default function Card({ projects }) {

  return (
    <div className='card-container'>
      { projects && projects.map(project => (
        <div key={ project.id }>
          <Link to={ `/project/${project.id}` } >
            <div className='card' key={ project.id }>
              <h4>{ project.title }</h4>
              <p>Due by: { project.dueDate.toDate().toDateString() }</p>
              { project.assignedTo.map(user => (
                <img src={ user.photoURL } alt="avatar" className='thumb' key={ user.photoURL } />
              )) }
            </div>
          </Link>
        </div>
      ))
      }
    </div >
  );
}
