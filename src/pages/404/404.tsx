import { useNavigate } from "react-router-dom";
import Button from "../../components/reusable/button";

export default function PageNotFound404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="mb-4">
        <img src="/images/oops.png" alt="404 page not found!" />
      </div>

      <div className="text-center">
        <h1 className="text-4xl text-gray-700 font-semibold">404 - Page not found</h1>

        <p className="mt-4 max-w-[440px]">
          The page you are looking for might have been removed, had its name changed or is temporary
          unavailable.
        </p>

        <div className="flex gap-2 justify-center mt-4">
          <Button handleClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}
