import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../util/supabaseCalls';

function AddProject({ setShowProjectForm, updateProjects }) {
  const { user } = useUser();
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError('Project name cannot be empty');
      return;
    }
    setShowProjectForm((prev) => !prev);

    const { error } = await supabase
      .from('projects')
      .insert([{ projectname: projectName, user_id: user.id }]);

    //find project id based on project name
    const { data, error: error2 } = await supabase
      .from('projects')
      .select('project_id')
      .eq('projectname', projectName)
      .single();
    const project_id = data.project_id;
    if (error) {
      setError('Failed to add project');
      console.error('Error creating project:', error);
    } else {
      setError('');
      setShowProjectForm(false);
      setProjectName('');
      updateProjects(user.id);
      navigate(`/projects/${project_id}`);
    }
  };

  return (
    <>
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
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

export default AddProject;
