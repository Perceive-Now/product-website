import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//
import PageLoading from "../../components/app/pageLoading";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";
// import Cookies from "universal-cookie";
// import jsCookie from "js-cookie";
// import toast from "react-hot-toast";

/**
 *
 */
export default function AuthLayout() {
  const navigate = useNavigate();
  // const pathname = useLocation();

  const PathPersistRef = useRef<PathPersistRefProps>({
    path: `${window.location.pathname}${window.location.search}`,
  });

  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  // const { user } = authStore;

  //
  const [isLoading, setIsLoading] = useState(true);

  //
  const getSession = useCallback(async () => {
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
        // ?callback_path=${encodeURIComponent(PathPersistRef.current.path)}
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
  }, [authStore.token, dispatch, navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // useEffect(() => {
  //   if (user) {
  //     if (user.subscription.has_subscription && user.subscription?.data) {
  //       if (user.subscription.data?.subscription_status === "unpaid") {
  //         navigate("/signup/complete");
  //       }
  //     } else {
  //       navigate("/signup/complete");
  //     }
  //   }
  // }, [navigate, user]);

  // useEffect(() => {
  //   if (searchedKeywords.length <= 0 && pathname.pathname !== "/") {
  //     toast.error("Please add keyword to continue");
  //     navigate("/");
  //   }
  // }, [navigate, pathname, searchedKeywords]);

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
