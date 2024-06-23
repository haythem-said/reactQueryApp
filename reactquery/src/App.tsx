import React, { useState } from "react";
import "./App.css";
import { useFetchData, addTasks } from "./exempleThree/useFetchData";
import { useMutation } from "react-query";

function App() {
  const { data, isLoading, error } = useFetchData(
    "http://localhost:3000/tasks"
  );
  const addTaskMutation = useMutation(addTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      setErrorMessage("Le titre de la tâche ne peut pas être vide.");
      return;
    }

    try {
      await addTaskMutation.mutateAsync(newTaskTitle);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      setErrorMessage(
        "Erreur lors de l'ajout de la tâche. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div className="App">
      <h1>Application de gestion des tâches</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Entrez le titre de la tâche"
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.target.value);
            setErrorMessage(""); // Réinitialiser l'erreur lors de la modification de l'entrée
          }}
        />
        <button onClick={handleAddTask}>Ajouter une tâche</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : (
        <div className="task-list">
          <h2>Liste des tâches</h2>
          <ul>
            {data.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
