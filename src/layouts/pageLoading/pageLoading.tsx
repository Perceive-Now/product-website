import DotLoader from "src/components/reusable/dot-loader";
import { LoadingIcon } from "../../components/icons";

export default function PageLoading() {
  return (
    <div className="w-screen !h-screen flex justify-center items-center text-primary-600">
      <DotLoader />
    </div>
  );
}
