import { useEffect, useState, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';
import { getProjects } from '../util/supabaseCalls';
import { UserProjectsContext } from '../context/UserProjectContext';

function Projects() {
  const { userProjects, setUserProjects, updateProjects, user } =
    useContext(UserProjectsContext);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const userId = user.id;
  // console.log(userProjects);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Projects</h1>
      {userProjects.length > 0 ? (
        <ul>
          {userProjects?.map((project) => (
            <li
              key={project.project_id}
              className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Link
                className="text-inherit "
                to={`/projects/${project.project_id}`}
              >
                {project.projectname}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">You have no projects</p>
      )}
      <div className="text-center mt-6">
        {!showProjectForm && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
            onClick={() => setShowProjectForm(true)}
          >
            AddProject
          </button>
        )}
        {showProjectForm && (
          <AddProject
            setShowProjectForm={setShowProjectForm}
            updateProjects={updateProjects}
          />
        )}
      </div>
    </div>
  );
}

export default Projects;
