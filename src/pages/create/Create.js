// tools
import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

// styles
import './Create.css';

// categories
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  // form states
  const [ title, setTitle ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ assigned, setAssigned ] = useState([]);
  const [ details, setDetails ] = useState('');
  const [ users, setUsers ] = useState([]);
  const [ category, setCategory ] = useState('');
  const [ formError, setFormError ] = useState(null);

  // hook values
  const { add, state } = useFirestore('projects');
  console.log(state);
  const { user } = useAuthContext();
  const { data } = useCollection('users');
  const navigate = useNavigate();

  // set select input options
  useEffect(() => {
    if (data) {
      setUsers(data.map(user => {
        return {
          value: { ...user, id: user.id }, label: user.displayName
        };
      }));
    }
  }, [ data ]);

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // check if any users were selected for the project
    if (assigned.length < 1) {
      setFormError('Please assign this project to someone');
      return;
    }

    // check if no category was selected
    if (!category) {
      setFormError('Please select a category');
    }

    // who created the project?
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    // assigned users
    const assignedUsers = assigned.map(user => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      };
    });

    // create an object to add to the database
    const project = {
      title,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      details,
      createdBy,
      assignedTo: assignedUsers,
      category: category.value,
      comments: []
    };

    console.log(project);

    // add the project to database
    await add(project);
    if (!state.error) {
      navigate('/');
    }
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
      <label>
        <span>Assigned to:</span>
        <Select
          isMulti
          options={ users }
          onChange={ (option) => setAssigned(option) }
        />
      </label>
      {/* category select */ }
      <label>
        <span>Category:</span>
        <Select
          options={ categories }
          onChange={ (option) => setCategory(option) }
        />
      </label>
      { state.error && <p className="error">{ state.error }</p> }
      { formError && <p className='error'>{ formError }</p> }
      { state.isPending && <button className="btn" disabled>Loading ...</button> }
      { !state.isPending && <button className="btn">Add Project</button> }
    </form>
  );
}

