import { ReactElement, useState } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

interface Blog {
  id: number;
  title: string;
  body: string;
}

export default function Blog() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { isLoading, data, error } = useQuery("blogData", async () => {
    const { data } = await axios.get("/api/blog");
    return data;
  });

  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post("api/blog", {
        title,
        body: content,
      }),
    onSuccess: ({ data }) => {
      queryClient.setQueryData("blogData", data);
    },
  });

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();

    setTitle("");
    setContent("");
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error instanceof Error) return <span>Error : {error.message}</span>;

  return (
    <section>
      <h1>Blog.</h1>
      <h3>A statically generated blog example using Next.js and WordPress.</h3>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={title}
          placeholder="Enter Title."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          placeholder="Enter Content."
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <StBlogDataWrapper>
        {data &&
          data.map((blogData: Blog) => (
            <StBlogData key={blogData.id}>
              <h1>{blogData.title}</h1>
              <p>{blogData.body}</p>
            </StBlogData>
          ))}
      </StBlogDataWrapper>
    </section>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

const StBlogDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StBlogData = styled.article`
  width: 350px;
  border-radius: 15px;
  background-color: #bdbdbd;
  padding: 10px;
`;
