import React, { useState, useContext } from 'react';
import { PanelLeftOpen, Home, Blocks, CircleUserRound } from 'lucide-react';
import { UserProjectsContext } from '../context/UserProjectContext';
import { NavLink, Link } from 'react-router-dom';

function SideBarClosed({ setIsSidebarOpen }) {
  const { userProjects } = useContext(UserProjectsContext);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="min-w-10">
      <aside className="h-screen">
        <nav className="h-full border-r-4 ml-2">
          <div className="my-8">
            <div className="flex flex-basis my-8">
              <div className="cursor-pointer">
                <PanelLeftOpen
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                />
              </div>
            </div>
            <div className="my-8 ">
              <div className="tooltip tooltip-right" data-tip="Home">
                <NavLink to="/">
                  {' '}
                  <Home />
                </NavLink>
              </div>
            </div>
            <div className="my-8">
              <div
                className={`tooltip tooltip-right ${isHovered ? 'hidden' : ''}`}
                data-tip="Projects"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <NavLink to="/projects">
                  <Blocks />
                </NavLink>
              </div>

              {isHovered && (
                <div
                  className="absolute bg-white border shadow-lg p-4 rounded"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link className="text-inherit" to={`/projects/`}>
                    Projects
                  </Link>
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
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-x-1 bottom-1">
            <div className="flex">
              <CircleUserRound />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default SideBarClosed;
