import useSWR from "swr";

import PageWrapper from "../src/components/page-wrapper/PageWrapper";
import ListingPost from "../src/components/listing-post/ListingPost";

import fetcher from "../src/utils/fetcher";
import { normalizePostListData } from "../src/utils/normalizer";

export default function Home() {
  const { data, error } = useSWR("http://localhost:9001/posts", fetcher);

  if (!error && !data) {
    return "loading";
  }

  if (error) {
    return "error page";
  }

  const normalizedData = normalizePostListData(data);

  return (
    <PageWrapper title="Home - Challenge">
      <h1>Blog</h1>
      {normalizedData.map((post) => (
        <ListingPost key={post.id} post={post} />
      ))}
    </PageWrapper>
  );
}
