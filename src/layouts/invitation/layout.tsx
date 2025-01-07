import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

const InviteLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const invitedData = {
    invited: searchParams.get("invited"),
    email: searchParams.get("email"),
    organization_name: searchParams.get("organization_name"),
    role: searchParams.get("role"),
    organization_industry: searchParams.get("organization_industry"),
  };

  console.log(invitedData);

  useEffect(() => {
    if (
      !invitedData.invited ||
      !invitedData.email ||
      !invitedData.organization_name ||
      !invitedData.role ||
      !invitedData.organization_industry
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default InviteLayout;
