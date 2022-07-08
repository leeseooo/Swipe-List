import axios from "axios";
import { useQuery } from "react-query";
import { Post } from "../../types/Post";

export const fetchPost = async (id: number) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post: Post = data;
  return post;
};

export const usePost = (id: number) => {
  return useQuery(["post", id], () => fetchPost(id), {
    enabled: !!id,
    keepPreviousData: true,
  });
};
