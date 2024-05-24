import { useState } from 'react';
import SideBarOpen from './SideBarOpen';
import SideBarClosed from './SideBarClosed';

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return isSidebarOpen ? (
    <SideBarOpen setIsSidebarOpen={setIsSidebarOpen} />
  ) : (
    <SideBarClosed setIsSidebarOpen={setIsSidebarOpen} />
  );
}

export default SideBar;
