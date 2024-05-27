import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  'https://raqgqzouznstksdksmsl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcWdxem91em5zdGtzZGtzbXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0OTUxMzYsImV4cCI6MjAzMjA3MTEzNn0.DAsoroYb_z_JFdkizcRil-dVLjZbLF2zVQKhC5ACrYU',
);

export async function getProjects(userId) {
  const { data, error } = await supabase
    .from('projects')
    .select()
    .eq('user_id', userId);
  if (error) {
    console.error('Error fetching projects:', error);
  } else {
    return data;
  }
}

export async function getProjectTasks(projectId) {
  const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('project_id', projectId);

  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    return data;
  }
}
