// tools
import { useState } from "react";

// styles
import './Signup.css';

export default function Login() {
  // form states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form onSubmit={ handleSubmit } className='signup'>
      <h2>Sign up</h2>

      {/* email input */ }
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
        />
      </label>
      {/* password input */ }
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
        />
      </label>
      {/* name input */ }
      <label>
        <span>Display name:</span>
        <input
          type="text"
          required
          onChange={ (e) => setName(e.target.value) }
          value={ name }
        />
      </label>
      <button className="btn">Sign up</button>
    </form>
  );
}
