import axios from "axios";
import { useQuery } from "react-query";
import { Post } from "../../types/Post";

export const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts: Post[] = data;
  return posts;
};

export const usePosts = () => {
  return useQuery("posts", fetchPosts);
};
