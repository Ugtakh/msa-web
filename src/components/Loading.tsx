import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center my-50">
      <Loader className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
};

export default Loading;
