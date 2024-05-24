import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
// import About from '../pages/About';
import Projects from '../components/Projects.jsx';
import NotFound from '../pages/NotFound.jsx';
import Layout from '../layouts/Layout.jsx';
import ProjectPage from '../pages/ProjectPage.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
