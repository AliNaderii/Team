// tools
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';


// styles
import './Sidebar.css';
import Dashboard from '../assets/dashboard_icon.svg';
import Add from '../assets/add_icon.svg';

export default function Sidebar() {
  const { user } = useAuthContext();
  // useLogout hook values
  const { logout } = useLogout();

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        {/* user info */ }
        <div className='user'>
          <div>
            <img className='thumb' src={ user.photoURL } alt='avatar' />
            <h4>Hey { user.displayName }</h4>
          </div>
          { user && <button className='btn sm-logout' onClick={ logout }>Log out</button> }
        </div>

        {/* sidebar links */ }
        <div className='link-container'>

          <NavLink to='/' className='link'>
            <img src={ Dashboard } alt='dashbaord icon' />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to='/create' className='link'>
            <img src={ Add } alt='new project icon' />
            <span>New Project</span>
          </NavLink>

        </div>
      </div>
    </div>
  );
}
