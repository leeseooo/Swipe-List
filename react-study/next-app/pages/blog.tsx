import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

interface Blog {
  id: number;
  title: string;
  body: string;
}

export default function Blog() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ref, inView] = useInView();

  const { status, data, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      "infiniteBlog",
      ({ pageParam = 1 }) => axios.get(`/api/blog/${pageParam}`),
      {
        getNextPageParam: (lastPage, allPages) => {
          console.log(lastPage.data);
          return lastPage.data.id + 1;
        },
      }
    );

  useEffect(() => {
    if (!data) return;
    const isLastPage = data?.pages[data.pages.length - 1] ? true : false;
    if (!isLastPage && inView) fetchNextPage();
  }, [inView]);

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

  if (status === "loading") return <div>Loading...</div>;
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
        {data?.pages[0].data.map((blogData: Blog) => {
          return (
            <StBlogData key={blogData.id}>
              <h1>{blogData.title}</h1>
              <p>{blogData.body}</p>
            </StBlogData>
          );
        })}
      </StBlogDataWrapper>
      <button
        ref={ref}
        disabled={isFetching || !hasNextPage}
        onClick={() => hasNextPage && fetchNextPage()}
      >
        {hasNextPage ? "Load More" : "No More Data.."}
      </button>
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
