import React, { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext({});
const GetDealer = ({ children }: any) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDealer = async () => {
      try {
        const response = await fetch("http://localhost:3030/dealer");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du dealer");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erreur lors de la récupération du dealer :", error);
        //@ts-ignore
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDealer();
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement : {error}</div>;
  }

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default GetDealer;
