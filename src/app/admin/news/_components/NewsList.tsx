import { NewsCard } from "./NewsCard";
import { getArticles } from "@/actions/news";
import NotFoundData from "../../partners/_components/NotFoundData";

const NewsList = async () => {
  const news = await getArticles();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5">
      {news.length > 0 ? (
        news.map((newItem) => <NewsCard key={newItem._id} newsItem={newItem} />)
      ) : (
        <NotFoundData />
      )}
    </div>
  );
};

export default NewsList;
