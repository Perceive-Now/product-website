import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//
import PageLoading from "../../components/app/pageLoading";

//
import { getCurrentSession, getUserDetails } from "../../stores/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

/**
 *
 */
export default function AuthLayout() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.auth?.token);

  //
  const [isLoading, setIsLoading] = useState(true);

  //
  const getSession = async () => {
    if (userToken) {
      setIsLoading(false);
      return;
    }

    const session = await dispatch(getCurrentSession()).unwrap();
    if (!session.success) navigate("/login");

    setIsLoading(false);
  };

  const getUserDetail = async() => {
    await dispatch(getUserDetails()).unwrap();
  }

  useEffect(() => {
    getSession();
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Do not show the content initially
  if (isLoading) return <PageLoading />;

  return (
    <div>
      {/* Maybe add some loading animation initially when fetching and validating the data?? */}
      <Outlet />
    </div>
  );
}
