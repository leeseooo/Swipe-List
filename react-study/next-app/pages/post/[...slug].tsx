import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  const isSlugString = (
    slug: string | string[] | undefined
  ): slug is string[] => {
    return typeof slug !== "string" && slug !== undefined;
  };

  if (!isSlugString(slug)) return;

  return <div>Slug : {slug.join("/")}</div>;
}
