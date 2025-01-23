import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//
import PageLoading from "../pageLoading";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCurrentSession, getUserDetails } from "../../stores/auth";
//
import { getSessionDetails } from "../../stores/session";
import toast from "react-hot-toast";
import axios from "axios";
import { NEW_BACKEND_URL } from "src/pages/authentication/signup/env";
import { AppConfig } from "src/config/app.config";

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
  const session = useAppSelector((state) => state.sessionDetail);

  const [isLoading, setIsLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  //
  const fetchUserDetails = async (userId: number) => {
    try {
      const response = await axios.get(`${NEW_BACKEND_URL}/user/details/${userId}`, {
        headers: {
          Accept: "application/json",
          "secret-code": `${AppConfig.ORGANIZATION_SECRET}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error fetching user details", error);
      return null;
    }
  };

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

      const {
        first_name,
        last_name,
        job_position,
        about_me,
        company_name,
        username,
        email,
        registration_completed,
      } = user;

      // List of allowed paths during signup flow
      const signupFlowPaths = [
        "/signup/success",
        "/signup/organization-setting",
        "/signup/profile",
        "/signup/team",
        "/signup/review",
        "/signup/finish",
      ];

      // Check if the user is missing required fields
      const isProfileIncomplete = !first_name || !job_position || !about_me;

      if (
        isProfileIncomplete &&
        !signupFlowPaths.includes(location.pathname) &&
        !user.registration_completed // Ensure the registration_completed flag is considered
      ) {
        toast.error("Please complete your profile to proceed.", {
          position: "top-right",
        });

        navigate("/signup/success");
      }

      if (
        registration_completed &&
        !first_name &&
        !last_name &&
        !job_position &&
        !about_me &&
        company_name
      ) {
        navigate("/invite/success");
      }

      fetchUserDetails(session.session?.user_id as number).then((data) => {
        if (data?.user_details) {
          if (data.user_details.role === "User" && signupFlowPaths.includes(location.pathname)) {
            navigate("/");
          }
        }
      });
    }
  }, [navigate, user, location.pathname]);

  // Do not show the content initially
  if (isLoading || checking) return <PageLoading />;

  return (
    <div className="">
      <Outlet />
    </div>
  );
}
