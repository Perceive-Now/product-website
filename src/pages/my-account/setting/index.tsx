import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

//
import ProfileComponent from "../profile/profile";

//
import { getBillingHistory } from "../../../utils/api/product";

//
import Loading from "../../../components/reusable/loading";

/**
 *
 */
const Setting = () => {
  const {
    data: billings,
    isLoading,
    isFetching,
  } = useQuery(["get-billings"], async () => {
    return await getBillingHistory();
  });

  // Fetching time period
  useEffect(() => {
    if (!billings) return;
    //
  }, [billings]);

  if (isLoading || isFetching) {
    return <Loading isLoading={isLoading || isFetching} />;
  }

  return (
    <>
    <div>
      <h6 className="text-2xl font-bold text-primary-900">My Account &gt; Settings</h6>
        <div className="flex flex-col w-[900px] items-center justify-center mt-4">
        <ProfileComponent showEdit={false} title={"Billing history"}>
          <div className="p-[20px] space-y-[8px]">
            {billings && billings?.length > 0 ? (
              <>
                {billings?.map((billing, idx) => (
                  <div key={idx * 19} className="grid grid-cols-4 text-secondary-800">
                    <div>
                      {billing.final_payment_info.amount === 99500 ? (
                        <span>Pro Plan</span>
                      ) : (
                        <span>Premium Plan</span>
                      )}
                    </div>
                    <div>{billing.status}</div>
                    <div>${billing.final_payment_info.amount / 100}</div>
                  </div>
                ))}
              </>
            ) : (
              <p>No Billing History </p>
            )}
          </div>
        </ProfileComponent>
        </div>
      </div>
    </>
  );
};

export default Setting;
