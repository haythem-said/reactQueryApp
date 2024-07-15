export const getVehicules = async ({ queryKey }: any) => {
  const [_key, { userId }] = queryKey;
  console.log("userId-->", userId);
  const result = await fetch(
    `http://localhost:3030/vehicules?id=${userId}`
  ).then((res) => res.json());
  return result;
};
