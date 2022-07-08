import Link from "next/link";
import React, { ReactElement, useCallback, useState } from "react";
import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import styled from "styled-components";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQueryClient,
} from "react-query";
import { fetchPosts, usePosts } from "../hooks/api/usePosts";
import axios from "axios";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { status, data, error } = usePosts();
  const queryClient = useQueryClient();

  const renderByStatus = useCallback(() => {
    switch (status) {
      case "loading":
        return <div>Loading...</div>;
      case "error":
        if (error instanceof Error) {
          return <span>Error : {error.message}</span>;
        }
      default:
        return (
          <>
            {data?.map((post) => (
              <StArticle key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <h2
                    style={
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "#828282",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </h2>
                </Link>
                <p>{post.body}</p>
              </StArticle>
            ))}
          </>
        );
    }
  }, [status, error, data, queryClient]);

  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          body: {
            title: title,
            body: content,
            userId: 1,
          },
        },
        { headers: { "Content-type": "application/json; charset=UTF-8" } }
      ),
  });
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    mutation.mutate();
  };

  return (
    <section>
      <h1>Post List</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          placeholder="Enter Contents"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {renderByStatus()}
    </section>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

Posts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

const StArticle = styled.article`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  & h2 {
    &:hover {
      text-decoration: underline;
      color: palevioletred;
    }
  }
`;
