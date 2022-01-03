// tools
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import './Login.css';

export default function Login() {
  // form states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  // useLogin hook values
  const { login, error, isPending } = useLogin();

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <form onSubmit={ handleSubmit } className="login">
      <h2>Login</h2>
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
      { error && <p className="error">{ error }</p> }
      { isPending && <button className="btn" disabled>Loading ...</button> }
      { !isPending && <button className="btn">Login</button> }
    </form>
  );
}
