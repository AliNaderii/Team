// tools
import { useState } from 'react';
import { useProject } from '../../hooks/useProject';
import { useAuthContext } from '../../hooks/useAuthContext';
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDistanceToNow } from 'date-fns';

// styles
import './Comments.css';

export default function Comments({ id }) {
  // form states
  const [ comment, setComment ] = useState('');
  const { project } = useProject('projects', id);

  // custom hook values
  const { user } = useAuthContext();
  const { update, state } = useFirestore('projects');

  // submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentObject = {
      creator: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      text: comment,
      photoURL: user.photoURL,
      id: Math.random()
    };

    await update(id, {
      comments: [ ...project.comments, commentObject ]
    });

    if (!state.error) {
      setComment('');
    }
  };

  return (
    <div className='comments-container'>
      <div>
        {/* single comment */ }
        <h3 className="page-title">Project Comments</h3>
        { project && project.comments.map(comment => (
          <div className="comment" key={ comment.id }>
            <div className="creator">
              <img className="thumb" src={ comment.photoURL } alt='avatar' />
              <p>{ comment.creator }</p>
            </div>
            <p className="date">
              {
                formatDistanceToNow(
                  comment.createdAt.toDate(),
                  { addSuffix: true }
                )
              }</p>
            <p className="text">{ comment.text }</p>
          </div>
        )) }
      </div>
      {/* add comment form */ }
      <form onSubmit={ handleSubmit }>
        <h4 className='page-title'>Add new comment</h4>
        <textarea
          placeholder='What do you think?'
          onChange={ (e) => setComment(e.target.value) }
          value={ comment }
        />
        { state.isPending && <button className='btn'>Loading</button> }
        { !state.isPending && <button className='btn'>Add Comment</button> }
      </form>

    </div>
  );
}
