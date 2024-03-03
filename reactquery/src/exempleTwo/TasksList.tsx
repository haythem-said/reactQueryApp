import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/tasks");
  const data = await response.json();
  return data;
};

const addTask = async (title: string): Promise<Task> => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  const data = await response.json();
  return data;
};

const deleteTask = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
};

const TasksList = () => {
  const { data: tasks, isLoading, error } = useQuery("tasks", fetchTasks);
  const addTaskMutation = useMutation(addTask);
  const deleteTaskMutation = useMutation(deleteTask);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = async () => {
    await addTaskMutation.mutateAsync(newTaskTitle);
    setNewTaskTitle("");
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
