import React from "react";
import { useMutation } from "@tanstack/react-query";

const AddPosts = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isPending) return <>Loading...</>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <button
        onClick={() => {
          //@ts-ignore
          mutate({
            userId: 9,
            title: "HAYTHEM",
            body: "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed",
          });
        }}
      >
        Add Post
      </button>
      {isSuccess ? <div>Post added successfully</div> : <div>Click the button to add a post</div>}
    </div>
  );
};

export default AddPosts;
