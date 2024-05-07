import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//
import PageLoading from "../../components/app/pageLoading";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";
import { getSessionDetails } from "../../stores/session";

/**
 *
 */
export default function AuthLayout() {
  const navigate = useNavigate();
  const userDetails = useAppSelector((state) => state.auth.user);
  // const pathname = useLocation();

  // const PathPersistRef = useRef<PathPersistRefProps>({
  //   path: `${window.location.pathname}${window.location.search}`,
  // });

  // console.log(PathPersistRef.current.path)

  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  //
  const getSession = useCallback(async () => {
    if (authStore.token) {
      await dispatch(getUserDetails());
      await dispatch(getSessionDetails());
      setIsLoading(false);
      return;
    }

    // Getting current session details
    const session = await dispatch(getCurrentSession()).unwrap();

    if (!session.success) {
      return navigate("/login");
      // if (PathPersistRef.current.path) {
      //   return navigate(`/login?callback_path=${encodeURIComponent(PathPersistRef.current.path)}`);
      //   // ?callback_path=${encodeURIComponent(PathPersistRef.current.path)}
      // } else {
      // }
    }
    // PathPersistRef.current.path = encodeURIComponent(
    //   `${window.location.pathname}${window.location.search}`,
    // );
    // Getting user details
    await dispatch(getUserDetails());

    // Stop loading
    setIsLoading(false);
  }, [authStore.token, dispatch, navigate]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  useEffect(() => {
    if (userDetails) {
      if (!userDetails.registration_completed) {
        navigate("/user-registration");
      }
    }
  }, [navigate, userDetails]);

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

// interface PathPersistRefProps {
//   path: string | null;
// }
