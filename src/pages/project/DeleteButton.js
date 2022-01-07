import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";

export default function DeleteButton({ projectID }) {
  // useFirestore hook values
  const { deleteProject } = useFirestore('projects');
  // useNavigate hook values
  const navigate = useNavigate();

  const handleDelete = (projectID) => {
    deleteProject(projectID);
    navigate('/');
  };

  return (
    <div>
      <button className='btn' onClick={ () => handleDelete(projectID) }>Mark as Compeleted</button>
    </div>
  );
}
