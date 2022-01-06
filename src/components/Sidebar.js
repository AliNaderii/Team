// tools
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import './Sidebar.css';
import Dashboard from '../assets/dashboard_icon.svg';
import Add from '../assets/add_icon.svg';

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className='sidebar'>
      {/* user info */ }
      <div className='user'>
        <img className='thumb' src={ user.photoURL } alt='avatar' />
        <h4>Hey { user.displayName }</h4>
      </div>

      {/* sidebar links */ }
      <div className='link-container'>
        <div className='link'>
          <NavLink to='/'>
            <img src={ Dashboard } alt='dashbaord icon' />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className='link'>
          <NavLink to='/create'>
            <img src={ Add } alt='new project icon' />
            <span>New Project</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
