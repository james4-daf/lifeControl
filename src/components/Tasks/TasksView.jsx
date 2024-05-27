import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTasks } from '../../util/supabaseCalls';
import { UserProjectsContext } from '../../context/UserProjectContext';
import AddTask from './AddTask';

function TasksView() {
  const { projectTasks, setProjectTasks } = useContext(UserProjectsContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getProjectTasks(id);
      setProjectTasks(data);
    };

    fetchTasks();
  }, []);
  return (
    <div>
      TasksView
      <ul>
        {projectTasks?.map((task) => (
          <li key={task.tasks_id}>{task.taskname}</li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
}

export default TasksView;
