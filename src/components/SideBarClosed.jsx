import React from 'react';
import { PanelLeftOpen, Home, Blocks, CircleUserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function SideBarClosed({ setIsSidebarOpen }) {
  return (
    <div className="min-w-10 ">
      <aside className="h-screen">
        <nav className="h-full border-r-4">
          <div className="my-8">
            <div className="flex flex-basis my-8">
              <div className="cursor-pointer">
                <PanelLeftOpen
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                />
              </div>
            </div>
            <div className="my-8">
              <NavLink to="/">
                {' '}
                <Home />
              </NavLink>
            </div>
            <NavLink to="/projects">
              {' '}
              <Blocks />
            </NavLink>
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
