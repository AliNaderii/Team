// tools
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

// styles
import './Navbar.css';
import Logo from '../assets/temple.svg';

export default function Navbar() {
  // useAuthContext hook values
  const { user } = useAuthContext();
  // useLogout hook values
  const { logout, error } = useLogout();

  return (
    <nav className="navbar">
      <ul>
        {/* logo */ }
        <div className='logo-container'>
          <li className="logo">
            <img src={ Logo } alt="logo" />
            <span>Team</span>
          </li>
        </div>
        {/* buttons */ }
        { !user && (
          <>
            <li className='login-btn'><Link to="/login">Login</Link></li>
            <li className='signup-btn'><Link to="/signup">Signup</Link></li>
          </>
        ) }
        { user && <li className='btn logout' onClick={ logout }>Log out</li> }
        { error && <p className='error'>{ error }</p> }
      </ul>
    </nav>
  );
}
