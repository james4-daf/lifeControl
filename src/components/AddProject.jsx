import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

import { supabase } from '../util/supabaseCalls';

function AddProject({ setShowProjectForm, updateProjects }) {
  const { user } = useUser();
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProjectForm((prev) => !prev);

    const { error } = await supabase
      .from('projects')
      .insert([{ projectname: projectName, user_id: user.id }]);

    if (error) {
      console.error('Error creating project:', error);
    } else {
      setProjectName('');
      updateProjects(user.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="project name"
        className="border"
        value={projectName}
        type="text"
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddProject;
