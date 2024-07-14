export const getVehicules = async () => {
  const result = await fetch("http://localhost:3030/vehicules").then((res) =>
    res.json()
  );
  return result;
};
