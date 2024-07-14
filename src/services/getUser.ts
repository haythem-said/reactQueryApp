export const getUser = async ({ queryKey }: any) => {
  const [_key, { page }] = queryKey;
  console.log(queryKey);
  const result = await fetch(`http://localhost:3030/user?id=${page}`).then(
    (res) => res.json()
  );
  return result;
};
