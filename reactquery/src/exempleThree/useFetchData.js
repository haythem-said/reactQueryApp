// useFetchData.js

import { useQuery } from "react-query";

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur lors du chargement des données");
  return response.json();
}

export const useFetchData = (url) => {
  return useQuery("data", () => fetchData(url));
};

export const addTasks = async (title) => {
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
