import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//
import PageLoading from "../../components/app/pageLoading";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";

/**
 *
 */
export default function AuthLayout() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);

  //
  const [isLoading, setIsLoading] = useState(true);

  //
  const getSession = async () => {
    if (authStore.token) {
      setIsLoading(false);
      return;
    }

    // Getting current session details
    const session = await dispatch(getCurrentSession()).unwrap();
    if (!session.success) navigate("/login");

    // Getting user details
    await dispatch(getUserDetails());

    // Stop loading
    setIsLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  // Do not show the content initially
  if (isLoading) return <PageLoading />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
