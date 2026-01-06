import { Button } from "@/components/ui/button";
import { NewsCard } from "./NewsCard";
import Link from "next/link";
import NewsList from "./NewsList";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const NewsComp = () => {
  return (
    <div>
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-xl font-bold text-secondary">Мэдээний Жагсаалт</h1>
        <Button asChild>
          <Link href={"/admin/news/new"} className="uppercase">
            Шинэ мэдээ
          </Link>
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <NewsList />
      </Suspense>
    </div>
  );
};

export default NewsComp;
