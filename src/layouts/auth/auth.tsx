import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//
import PageLoading from "../pageLoading";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";
//
import { getSessionDetails } from "../../stores/session";

interface PathPersistRefProps {
  path: string | null;
}

/**
 *
 */
export default function AuthLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const PathPersistRef = useRef<PathPersistRefProps>({
    path: `${window.location.pathname}${window.location.search}`,
  });

  const { user } = useAppSelector((state) => state.auth);
  const authStore = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  //
  const getSession = useCallback(async () => {
    const session = await dispatch(getCurrentSession()).unwrap();

    if (!session.success) {
      if (PathPersistRef.current.path) {
        return navigate(`/login?callback_path=${encodeURIComponent(PathPersistRef.current.path)}`);
        // ?callback_path=${encodeURIComponent(PathPersistRef.current.path)}
      } else {
        return navigate("/login");
      }
    }
    // PathPersistRef.current.path = encodeURIComponent(
    //   `${window.location.pathname}${window.location.search}`,
    // );

    if (authStore.token) {
      await dispatch(getSessionDetails());
      await dispatch(getUserDetails());
      setIsLoading(false);

      return;
    }
    // Stop loading
    setIsLoading(false);
  }, [authStore.token, dispatch, navigate]);

  useEffect(() => {
    getSession();
  }, [getSession, navigate]);

  useEffect(() => {
    setChecking(true);
    if (user) {
      setChecking(false);
      if (!user.registration_completed) {
        navigate("/user-registration");
        // toast.("Please provide all the information to proceed")
      }
    }
  }, [navigate, user]);

  // Do not show the content initially
  if (isLoading || checking) return <PageLoading />;

  return (
    <div className="">
      <Outlet />
    </div>
  );
}
