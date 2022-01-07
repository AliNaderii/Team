// tools
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { projectAuth } from '../../firebase/config';

// styles && components
import Card from './Card';
import Filter from './Filter';
import './Dashboard.css';

const filters = [ 'all', 'mine', 'development', 'design', 'marketing', 'sales' ];

export default function Dashboard() {
  // useCollection hook values
  const { data: projects, error } = useCollection('projects');
  const [ filter, setFilter ] = useState('all');
  const { uid } = projectAuth.currentUser;

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  // filtered projects
  const filtered = projects ? projects.filter(project => {
    switch (filter) {
      case 'all':
        return true;
      case 'development':
      case 'design':
      case 'marketing':
      case 'sales':
        return project.category === filter;
      case 'mine':
        let assignedToMe = false;
        project.assignedTo.forEach(person => {
          if (person.id === uid) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      default:
        return true;
    }
  }) : null;

  return (
    <div className='dashboard'>
      <h2 className='page-title'>Dashboard</h2>
      { projects && <Filter filters={ filters } changeFilter={ changeFilter } /> }
      { !projects && <p>Please wait a moment ...</p> }
      { filtered && <Card projects={ filtered } /> }
      { error && <p className='error'>{ error }</p> }
    </div>
  );
}
