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
        <li className="logo">
          <img src={ Logo } alt="logo" />
          <span>Team</span>
        </li>
        {/* buttons */ }
        { !user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) }
        { user && <li className='btn' onClick={ logout }>Log out</li> }
        { error && <p className='error'>{ error }</p> }
      </ul>
    </nav>
  );
}
