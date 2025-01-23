import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InviteLayout from "../_components/InviteLayout";
import Loading from "src/components/reusable/loading";
import { useAppSelector } from "src/hooks/redux";
import { NEW_BACKEND_URL } from "../../signup/env";
import { AppConfig } from "src/config/app.config";
import { getCompanies } from "src/utils/api/userProfile";
import Button from "src/components/reusable/button";

const OrganizationInviteSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAppSelector((state) => state.sessionDetail.session);
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/user/details/${session?.user_id}`, {
        headers: {
          Accept: "application/json",
          "secret-code": AppConfig.ORGANIZATION_SECRET as string,
        },
      });
      const result = await res.json();
      console.log(result);
      const companies = await getCompanies();
      const userCompany = companies.find(
        (company) => company.id === result?.user_details?.company_id,
      );

      setOrganizationName(userCompany?.name || null);
      setIndustry(userCompany?.industry || null);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <InviteLayout currentStep={0} completedSteps={[]} invitedData={location.state?.invitedData}>
      {loading ? (
        <Loading width="50px" height="50px" isLoading={loading} />
      ) : (
        <div className="pt-5 px-8">
          <h1 className="text-[19px] font-semibold text-[#373D3F]">Organization Details</h1>
          <div className="space-y-4 mt-4 max-w-[550px]">
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization Name</label>
              <p className="mt-1 text-gray-800 border p-2 rounded-md border-gray-400">
                {organizationName || "N/A"}
              </p>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <p className="mt-1 text-gray-800">{industry || "N/A"}</p>
            </div> */}

            <Button
              rounded="full"
              handleClick={() => navigate("/invite/profile")}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </InviteLayout>
  );
};

export default OrganizationInviteSetting;
