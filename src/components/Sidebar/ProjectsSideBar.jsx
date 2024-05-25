import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { UserProjectsContext } from '../../context/UserProjectContext';
import { Link } from 'react-router-dom';

function ProjectsSideBar() {
  const { userProjects, setUserProjects, updateProjects, user } =
    useContext(UserProjectsContext);
  return (
    <div>
      {userProjects.length > 0 ? (
        <ul>
          {userProjects?.map((project) => (
            <li key={project.id}>
              <Link className="text-inherit" to={`/projects/${project.id}`}>
                {project.projectname}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no projects</p>
      )}
    </div>
  );
}

export default ProjectsSideBar;
