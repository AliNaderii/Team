// tools
import { useCollection } from '../../hooks/useCollection';

// styles && components
import Card from './Card';
import './Dashboard.css';

export default function Dashboard() {
  // useCollection hook values
  const { data: projects, error } = useCollection('projects');

  return (
    <div className='dashboard'>
      <h2 className='page-title'>Dashboard</h2>
      <Card projects={ projects } />
      { error && <p className='error'>{ error }</p> }
      { !projects && <p>Please wait a moment ...</p> }
    </div>
  );
}
