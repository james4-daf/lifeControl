import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';
import { getProjects } from '../util/supabaseCalls';

// const supabase = createClient(
//   'https://raqgqzouznstksdksmsl.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcWdxem91em5zdGtzZGtzbXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0OTUxMzYsImV4cCI6MjAzMjA3MTEzNn0.DAsoroYb_z_JFdkizcRil-dVLjZbLF2zVQKhC5ACrYU',
// );

function Projects() {
  const { user } = useUser();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const userId = user.id;
  //console.log(userId);
  const [userProjects, setUserProjects] = useState([]);

  // useEffect(() => {
  //   const fetchUserProjects = async () => {
  //     try {
  //       const data = await getProjects(userId);
  //       setUserProjects(data);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   };

  //   fetchUserProjects();
  // }, []);

  useEffect(() => {
    updateProjects(user.id);
  }, [user.id]);

  const updateProjects = async (userId) => {
    const projects = await getProjects(userId);
    setUserProjects(projects);
  };

  //console.log(userProjects);
  return (
    <div>
      {userProjects.length > 0 ? (
        <ul>
          {userProjects?.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.projectname}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no projects</p>
      )}
      {!showProjectForm && (
        <button onClick={() => setShowProjectForm(true)}>AddProject</button>
      )}
      {showProjectForm && (
        <AddProject
          setShowProjectForm={setShowProjectForm}
          updateProjects={updateProjects}
        />
      )}
    </div>
  );
}

export default Projects;
