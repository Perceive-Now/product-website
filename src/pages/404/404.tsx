import { useNavigate } from "react-router-dom";
import Button from "../../components/reusable/button";

export default function PageNotFound404() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-7xl font-semibold">404</h1>
        <h2 className="text-2xl">Page does not exist!</h2>

        <div className="flex gap-2 justify-center mt-3">
          <Button handleClick={() => navigate("/")}>Go Home</Button>
          <Button type="secondary" handleClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
