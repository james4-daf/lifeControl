import React from 'react';
import { useState, useContext } from 'react';
import { UserProjectsContext } from '../../context/UserProjectContext';
import { Link, NavLink } from 'react-router-dom';
import { Blocks, ChevronDown, ChevronUp } from 'lucide-react';

function ProjectsSideBar() {
  const [expandedProjects, setExpandedProjects] = useState(false);
  const { userProjects } = useContext(UserProjectsContext);
  return (
    <div>
      <div className="flex relative">
        <Blocks />
        <NavLink to="/projects"> Projects</NavLink>
        <div className="absolute top-0 right-0 cursor-pointer">
          {expandedProjects ? (
            <ChevronUp onClick={() => setExpandedProjects((prev) => !prev)} />
          ) : (
            <ChevronDown onClick={() => setExpandedProjects((prev) => !prev)} />
          )}
        </div>
      </div>
      {expandedProjects &&
        (userProjects.length > 0 ? (
          <ul>
            {userProjects?.map((project) => (
              <li key={project.project_id}>
                <Link
                  className="text-inherit"
                  to={`/projects/${project.project_id}`}
                >
                  {project.projectname}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no projects</p>
        ))}
    </div>
  );
}

export default ProjectsSideBar;
