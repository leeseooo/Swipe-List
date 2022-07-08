import Link from "next/link";
import { ReactElement, useCallback } from "react";
import Layout from "../../components/layout";
import Sidebar from "../../components/sidebar";
import { dehydrate, QueryClient } from "react-query";
import { fetchPosts } from "../../hooks/api/usePosts";
import { useRouter } from "next/router";
import { usePost } from "../../hooks/api/usePost";
import axios from "axios";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const { status, data, error, isFetching } = usePost(Number(id));

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
          data && (
            <>
              {isFetching && <span>Background Updating..🛠️</span>}
              <h1>{data.title}</h1>
              <div>{data.body}</div>
            </>
          )
        );
    }
  }, [status, error, data, isFetching]);
  return (
    <section>
      <Link href="/posts">Back</Link>
      {renderByStatus()}
    </section>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

  await queryClient.prefetchQuery("posts", fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};
