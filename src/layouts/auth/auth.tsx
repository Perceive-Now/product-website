import { useEffect, useRef, useState } from "react";
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
  const PathPersistRef = useRef<PathPersistRefProps>({
    path: `${window.location.pathname}${window.location.search}`,
  });

  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const { user } = authStore;

  //
  const [isLoading, setIsLoading] = useState(true);

  //
  const getSession = async () => {
    if (authStore.token) {
      await dispatch(getUserDetails());
      setIsLoading(false);
      return;
    }

    // Getting current session details
    const session = await dispatch(getCurrentSession()).unwrap();
    if (!session.success) {
      if (PathPersistRef.current.path) {
        return navigate(`/login?callback_path=${encodeURIComponent(PathPersistRef.current.path)}`);
      } else {
        return navigate("/login");
      }
    }
    PathPersistRef.current.path = encodeURIComponent(
      `${window.location.pathname}${window.location.search}`,
    );
    // Getting user details
    await dispatch(getUserDetails());

    // Stop loading
    setIsLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.subscription.has_subscription && user.subscription?.data) {
        if (user.subscription.data?.subscription_status === "unpaid") {
          navigate("/signup/complete");
        }
      } else {
        navigate("/signup/complete");
      }
    }
  }, [user]);

  // Do not show the content initially
  if (isLoading) return <PageLoading />;

  return (
    <div>
      <Outlet />
    </div>
  );
}

interface PathPersistRefProps {
  path: string | null;
}
