// tools
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import './Signup.css';

export default function Login() {
  // form states
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ displayName, setDisplayName ] = useState('');
  const [ avatar, setAvatar ] = useState(null);
  const [ avatarError, setAvatarError ] = useState(null);
  // useSignup hook values
  const { signup, error, isPending } = useSignup();

  // handleFileInput function
  const handleFileInput = (e) => {
    let selected = e.target.files[ 0 ];
    setAvatarError(null);

    // if no file was selected
    if (!selected) {
      setAvatarError('Please select a file for your avatar');
      return;
    }
    // if the selected file was not an image
    if (!selected.type.includes('image')) {
      setAvatarError('Please select an image for your avatar');
      return;
    }
    // is the selected file was larger than 1MB
    if (selected.size > 100000) {
      setAvatarError('The file size must be smaller than 100kb');
      return;
    }
    // if all the checks passed successfully
    setAvatar(selected);
  };

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, avatar);
    signup(email, password, displayName, avatar);
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
          onChange={ (e) => setDisplayName(e.target.value) }
          value={ displayName }
        />
      </label>
      {/* user avatar */ }
      <label>
        <span>Choose an avatar</span>
        <input
          type="file"
          required
          onChange={ handleFileInput }
        />
        {/* error message */ }
        { avatarError && <p className="error">{ avatarError }</p> }
      </label>
      { !isPending && <button className="btn">Sign up</button> }
      { isPending && <button className='btn' disabled>Loading...</button> }
      { error && <p className="error">{ error }</p> }
    </form>
  );
}
