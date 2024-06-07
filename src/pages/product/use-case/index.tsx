import { useEffect } from "react";
import UseCaseSelect from "../../../components/@report/use-case";
import { useAppDispatch } from "../../../hooks/redux";
import { getNewSession } from "../../../stores/auth";
import { useLocation } from "react-router-dom";
import { setSession } from "../../../stores/session";

const UseCasePage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/new-report") {
      dispatch(getNewSession());
      dispatch(
        setSession({
          session_data: {},
        }),
      );
    }
  }, [dispatch, location.pathname]);

  return (
    <>
      <UseCaseSelect />
    </>
  );
};

export default UseCasePage;
