import SideBar from '../components/SideBar';

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <div className="flex flex-row">
          <SideBar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
