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

  // useEffect(() => {
  //   // Create an instance of universal-cookie
  //   const cookies = new Cookies();

  //   // Retrieve session ID and user ID from cookies
  //   const sessionID = cookies.get("sessionID");
  //   const userID = cookies.get("userID");
  //   const token = cookies.get("token");

  //   jsCookie.set("pn_refresh", token);
  //   jsCookie.set("session_id", sessionID);
  //   jsCookie.set("user_id", userID);

  //   sessionStorage.setItem("pn_access", token);

  //   // Use session ID and user ID as needed
  //   // console.log('Session ID:', sessionID);
  //   // console.log('User ID:', userID);
  //   // console.log('token:', token);

  //   // Your code logic here
  // }, []);

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
