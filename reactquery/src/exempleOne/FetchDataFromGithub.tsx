import React from "react";
import { useQuery } from "react-query";

export interface DataType {
  name: string;
  description: string;
  subscribers_count: number;
  stargazers_count: number;
  forks_count: number;
}

const FetchDataFromGithub = () => {
  const { isLoading, error, data } = useQuery<DataType>(
    "fetchDataFromGitHub",
    () => {
      return fetch(
        "https://api.github.com/repos/tannerlinsley/react-query"
      ).then((res) => res.json());
    }
  );

  if (isLoading) return "Loading";
  if (error) return "error";

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
      <strong>👀 {data?.subscribers_count}</strong>{" "}
      <strong>✨ {data?.stargazers_count}</strong>{" "}
      <strong>🍴 {data?.forks_count}</strong>
    </div>
  );
};

export default FetchDataFromGithub;
