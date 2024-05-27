import { useUser } from '@clerk/clerk-react';
import { Plus } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserProjectsContext } from '../../context/UserProjectContext';
import { getProjectTasks, supabase } from '../../util/supabaseCalls';

function AddTask() {
  const { setProjectTasks } = useContext(UserProjectsContext);
  const [addTask, setAddTask] = useState(false);
  const { user } = useUser();
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError('Task name cannot be empty');
      return;
    }
    setAddTask((prev) => !prev);

    const { error } = await supabase.from('tasks').insert([
      {
        taskname: taskName,
        project_id: id,
        user_id: user.id,
        status: 'no status',
      },
    ]);

    if (error) {
      setError('Failed to add task');
      console.error('Error creating task:', error);
    } else {
      setError('');
      setAddTask(false);
      setTaskName('');
      const data = await getProjectTasks(id);
      setProjectTasks(data);
      // updateProjects(user.id);
    }
  };

  return (
    <div className="">
      {!addTask ? (
        <button
          className="btn bg-inherit hover:text-red-600 hover:bg-inherit border-collapse"
          onClick={() => setAddTask(true)}
        >
          <Plus />
          Add Task
        </button>
      ) : (
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task name"
            className="input input-bordered w-full max-w-xs"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default AddTask;
