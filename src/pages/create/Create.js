// tools
import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import './Create.css';

export default function Create() {
  // form states
  const [ title, setTitle ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  // const [ assigned, setAssigned ] = useState([]);
  const [ details, setDetails ] = useState('');
  // useFirestore hook values
  const { add, error, isPending } = useFirestore('projects');
  // useAuthContext hook values
  const { user } = useAuthContext();

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, dueDate, details);
    add({
      title,
      dueDate,
      details,
      createdBy: user.uid
    });
  };

  return (
    <form onSubmit={ handleSubmit } className="create">
      <h2>Add Project</h2>
      {/* title input */ }
      <label>
        <span>Title:</span>
        <input
          type="text"
          required
          onChange={ (e) => setTitle(e.target.value) }
          value={ title }
        />
      </label>
      {/* dueDate input */ }
      <label>
        <span>Due Date:</span>
        <input
          type="date"
          required
          onChange={ (e) => setDueDate(e.target.value) }
          value={ dueDate }
        />
      </label>
      {/* project details */ }
      <label>
        <span>Project Details:</span>
        <textarea
          required
          onChange={ (e) => setDetails(e.target.value) }
          value={ details }
        />
      </label>
      {/* assigned users */ }
      {/* <label>
        <span>Assigned to:</span>
        <input
          type="date"
          required
          onChange={ (e) => setDueDate(e.target.value) }
          value={ dueDate }
        />
      </label> */}
      { error && <p className="error">{ error }</p> }
      { isPending && <button className="btn" disabled>Loading ...</button> }
      { !isPending && <button className="btn">Add Project</button> }
    </form>
  );
}

