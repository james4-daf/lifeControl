import React from 'react';
import { SquareArrowLeft, Blocks, CircleUserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';

function SideBarOpen({ setIsSidebarOpen }) {
  return (
    <div className="basis-2/5 md:basis-1/5 m-2 ">
      <aside className="h-screen">
        <nav className="h-full border-r-4">
          <div className="flex flex-basis">
            <div className="basis-4/5">
              <NavLink to="/"> LifeControl</NavLink>
            </div>
            <div>
              <SquareArrowLeft
                onClick={() => setIsSidebarOpen((prev) => !prev)}
              />
            </div>
          </div>
          <div className="flex flex-basis">
            <div className="basis-4/5"></div>
          </div>
          <div className="flex">
            <Blocks />
            <NavLink to="/projects"> Projects</NavLink>
          </div>
          <div className="absolute inset-x-1 bottom-1">
            <div className="flex">
              <CircleUserRound />

              <SignOutButton />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default SideBarOpen;