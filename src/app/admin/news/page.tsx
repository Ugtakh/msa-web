import { Suspense } from "react";
import NewsList from "./_components/NewsList";

const NewsPage = async () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-col gap-4 py-4">
        <Suspense fallback={<div />}>
          <NewsList />
        </Suspense>
      </div>
    </div>
  );
};

export default NewsPage;
