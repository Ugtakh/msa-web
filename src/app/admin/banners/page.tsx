import BannerTable from "./_components/BannerTable";

const BannerPage = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-6 p-6">
        {/* <Suspense fallback={<Loader className="animate-spin" />}> */}
        <BannerTable />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default BannerPage;
