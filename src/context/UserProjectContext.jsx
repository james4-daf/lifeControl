import React, { createContext, useState, useEffect } from 'react';
import { getProjects } from '../util/supabaseCalls';
import { useUser } from '@clerk/clerk-react';

// Create a context with a default value (optional)
export const UserProjectsContext = createContext();

export const UserProjectsProvider = ({ children }) => {
  const [userProjects, setUserProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    updateProjects(user.id);
  }, [user.id]);

  const updateProjects = async (userId) => {
    const projects = await getProjects(userId);
    setUserProjects(projects);
  };

  return (
    <UserProjectsContext.Provider
      value={{
        userProjects,
        setUserProjects,
        updateProjects,
        user,
        projectTasks,
        setProjectTasks,
      }}
    >
      {children}
    </UserProjectsContext.Provider>
  );
};
