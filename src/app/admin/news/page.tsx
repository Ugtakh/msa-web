import NewsComp from "./_components/NewsComp";

const NewsPage = async () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-6 p-6">
        <NewsComp />
      </div>
    </div>
  );
};

export default NewsPage;
