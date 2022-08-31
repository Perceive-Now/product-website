import { LoadingIcon } from "../../icons";

export default function PageLoading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-primary-600">
      <LoadingIcon height={64} width={64} />
    </div>
  );
}
