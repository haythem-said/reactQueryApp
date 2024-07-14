import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const DataContext = createContext({});
const GetDealer = ({ children }: any) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const getDealer = async () => {
      const result = await fetch("http://localhost:3030/dealer")
        .then((res) => res.json())
        .catch((error) => {
          console.error("Erreur lors de la récupération du dealer :", error);
          setData({});
        });
      setData(result);
    };
    getDealer();
  }, []);
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default GetDealer;
