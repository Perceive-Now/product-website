import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageLoading from "../pageLoading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";
import { getSessionDetails } from "../../stores/session";
import toast from "react-hot-toast";

interface PathPersistRefProps {
  path: string | null;
}

export default function InviteAuthLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const PathPersistRef = useRef<PathPersistRefProps>({
    path: `${window.location.pathname}${window.location.search}`,
  });

  const { user } = useAppSelector((state) => state.auth);
  const authStore = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  const getSession = useCallback(async () => {
    const session = await dispatch(getCurrentSession()).unwrap();

    if (!session.success) {
      if (PathPersistRef.current.path) {
        return navigate(`/login?callback_path=${encodeURIComponent(PathPersistRef.current.path)}`);
      } else {
        return navigate("/login");
      }
    }

    if (authStore.token) {
      await dispatch(getSessionDetails());
      await dispatch(getUserDetails());
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [authStore.token, dispatch, navigate]);

  useEffect(() => {
    getSession();
  }, [getSession, navigate]);

  useEffect(() => {
    setChecking(true);

    if (user) {
      setChecking(false);

      const { first_name, company_name } = user;

      const inviteFlowPaths = ["/invite/organization-setting", "/invite/profile", "/invite/review"];

      const isProfileIncomplete = !first_name || !company_name;

      if (isProfileIncomplete && !inviteFlowPaths.includes(location.pathname)) {
        toast.error("Please complete the invitation setup process to proceed.", {
          position: "top-right",
        });

        navigate("/invite/organization-setting");
      }
    }
  }, [navigate, user, location.pathname]);

  if (isLoading || checking) return <PageLoading />;

  return (
    <div className="">
      <Outlet />
    </div>
  );
}
