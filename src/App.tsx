import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./services/getUser";
import { useContext, useState } from "react";
import { getVehicules } from "./services/getVehicules";
import { DataContext } from "./services/getDealer";
import Dealer from "./component/Dealer";

function App() {
  const [page, setPage] = useState(1);
  const userQuery = useQuery({
    queryKey: ["getUser", { page }],
    queryFn: getUser,
  });
  const vehiculeQuery = useQuery({
    queryKey: ["vehicule"],
    queryFn: getVehicules,
  });
  if (userQuery.isPending) return "Loading...";
  if (userQuery.error)
    return "An error has occurred: " + userQuery.error.message;
  if (vehiculeQuery.error)
    return "An error has occurred: " + vehiculeQuery.error.message;
  //@ts-ignore
  const { data } = useContext(DataContext);
  console.log("haythe-->", data);
  return (
    <>
      {userQuery.data.map((user: any) => (
        <div key={user.id} className="user-card">
          <h2>{user.nom_complet}</h2>
          <p>Email: {user.email}</p>
          <p>Profession: {user.profession}</p>
          <p>Langues parlées: {user.langues_parlees.join(", ")}</p>
        </div>
      ))}

      <button onClick={() => setPage(1)}>Page1</button>
      <button onClick={() => setPage(2)}>Page2</button>
      <button onClick={() => setPage(3)}>Page3</button>

      {vehiculeQuery.data.map((vehicule: any) => (
        <div key={vehicule.id}>
          <h2>{vehicule.marque}</h2>
          <h2>{vehicule.modele}</h2>
          <h2>{vehicule.kilométrage}</h2>
        </div>
      ))}
      <Dealer />
    </>
  );
}

export default App;
