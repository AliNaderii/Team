// tools
import { Link } from 'react-router-dom';

// styles
import './Navbar.css';
import Logo from '../assets/temple.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        {/* logo */ }
        <li className="logo">
          <img src={ Logo } alt="logo" />
          <span>Team</span>
        </li>
        {/* buttons */ }
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}
