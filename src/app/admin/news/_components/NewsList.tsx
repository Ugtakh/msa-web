import { Button } from "@/components/ui/button";
import { NewsCard } from "./NewsCard";
import Link from "next/link";
import { getArticles } from "@/actions/news";

const NewsList = async () => {
  const news = await getArticles();
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Мэдээний Жагсаалт</h1>
          <Button asChild>
            <Link href={"/admin/news/new"}>Шинэ мэдээ</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5">
        {news?.map((newItem) => (
          <NewsCard key={newItem._id} newsItem={newItem} />
        ))}
      </div>
    </>
  );
};

export default NewsList;
