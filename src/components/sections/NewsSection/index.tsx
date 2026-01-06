import NewsList from "./_components/NewsList";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_NEWS_QUERY } from "@/lib/sanity/queries/news";

const NewsSection = async () => {
  const news = await sanityFetch({ query: ALL_NEWS_QUERY });

  return <NewsList news={news} />;
};

export default NewsSection;
