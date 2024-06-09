import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/redux";

export default function ReportSectionStateManagementService() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Outlet />
    </>
  );
}
