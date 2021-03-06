// tools
import { useCollection } from '../hooks/useCollection';

// styles
import './AllUsers.css';

export default function AllUsers() {
  // hook values
  const { data: users } = useCollection('users');
  console.log(users);

  return (
    <div className='all-users-container'>
      <div className='title'>
        <h3 className='page-title'>All Users</h3>
      </div>
      <ul className='all-users'>
        { users && users.map(user => (
          <li className='users' key={ user.id }>
            { user.online && <span className='online'></span> }
            <span className='name'>{ user.displayName }</span>
            <img className='thumb' src={ user.photoURL } alt='avatar' />
          </li>
        )) }
      </ul>
    </div>
  );
}
