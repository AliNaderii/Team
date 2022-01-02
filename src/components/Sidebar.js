// tools
import { NavLink } from 'react-router-dom';

// styles
import './Sidebar.css';
import Dashboard from '../assets/dashboard_icon.svg';
import Add from '../assets/add_icon.svg';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      {/* user info */ }
      <div className='user'>
        <div className='thumb'></div>
        <h4>Hey user</h4>
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
