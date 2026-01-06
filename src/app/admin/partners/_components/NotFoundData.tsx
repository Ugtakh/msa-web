import Image from "next/image";

import notFound from "@/assets/images/no-found.svg";

const NotFoundData = () => {
  return (
    <div className="col-span-4 flex flex-col items-center justify-center">
      <Image
        src={notFound}
        alt="not-found"
        width={400}
        height={400}
        className="w-5/12 h-auto"
      />
      <h1 className="my-3 text-secondary">Мэдээлэл байхгүй байна.</h1>
    </div>
  );
};

export default NotFoundData;
