import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects, supabase, getProjectTasks } from '../util/supabaseCalls';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Settings } from 'lucide-react';
import { UserProjectsContext } from '../context/UserProjectContext';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import TasksView from '../components/Tasks/TasksView';

function ProjectPage() {
  const { setUserProjects, user, setProjectTasks } =
    useContext(UserProjectsContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select()
        .eq('project_id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
      } else {
        setProject(data);
      }
    };
    const fetchTasks = async () => {
      const data = await getProjectTasks(id);
      setProjectTasks(data);
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  const handleUpdateProjectName = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('projects')
      .update({ projectname: newProjectName })
      .eq('project_id', id);

    if (error) {
      console.error('Error updating project name:', error);
    } else {
      setIsOpen(false);
      setProject({ ...project, projectname: newProjectName }); // Update project state with new name
      toast.success(`Project name updated to ${newProjectName}`, {
        position: 'top-right',
      });
    }
  };

  const deleteProject = async () => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('project_id', id);
    if (error) {
      console.error('Error deleting project:', error);
    } else {
      const data = await getProjects(user.id);
      setUserProjects(data);
      navigate('/projects');
      toast.success(`Project has been deleted`, {
        position: 'top-right',
      });
    }
  };

  const openDialog = () => {
    setNewProjectName(project.projectname); // Set the current project name when opening the dialog
    setIsOpen(true);
  };

  const exitDialog = () => {
    setIsOpen(false);
    setIsDelete(false);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-start p-4">
        <h1 className="text-2xl font-bold">{project.projectname}</h1>

        <button className="w-16 h-10" onClick={openDialog}>
          <Settings />
        </button>

        <Dialog open={isOpen} onClose={() => exitDialog()}>
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 relative">
              <button
                className="absolute top-0 right-0 bg-red-200"
                onClick={() => exitDialog()}
              >
                <X />
              </button>

              <DialogTitle className="font-bold">Project Settings</DialogTitle>
              <form onSubmit={handleUpdateProjectName}>
                <input
                  className=" border p-2 rounded"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
              {!isDelete && (
                <button
                  type="button"
                  className="bg-red-100"
                  onClick={() => setIsDelete(true)}
                >
                  Delete project
                </button>
              )}
              {isDelete && (
                <div className="flex gap-4">
                  <p>Are you sure you want to delete this project?</p>
                  <button type="button" onClick={() => setIsDelete(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600"
                    onClick={deleteProject}
                  >
                    Delete project
                  </button>
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>
        <ToastContainer autoClose={2000} position="bottom-right" />
      </div>
      <TasksView />
    </div>
  );
}

export default ProjectPage;
