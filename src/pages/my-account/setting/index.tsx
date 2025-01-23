import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//
import ProfileComponent from "../profile/profile";

//
import { getBillingHistory } from "../../../utils/api/product";

//
import Loading from "../../../components/reusable/loading";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

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

  const billingssample = [
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
    {
      final_payment_info: {
        amount: 900000,
      },
      status: "Completed",
    },
  ];

  const cardsample = [
    {
      card_holder: "Laura Lee",
      card_ending: "567",
      expiry: "May, 2027",
    },
    {
      card_holder: "Laura Lee",
      card_ending: "567",
      expiry: "May, 2027",
    },
    {
      card_holder: "Laura Lee",
      card_ending: "567",
      expiry: "May, 2027",
    },
  ];

  return (
    <>
      {/* <div>
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
      </div> */}

      <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
        <div className="p-1">
          <h6 className="text-lg font-semibold ml-0">Settings &gt; Billing</h6>
          <div className="flex justify-start items-center pt-3 pl-1">
            <Link to="/profile">
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        </div>
        {/* <div className="w-[45%] ml-[30%]">
          <div className="">
            <h6 className="text-start font-semibold text-lg">Linked Cards</h6>
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
          <div className="p-[20px]">
            <h6 className="text-start font-semibold text-lg">Billing History</h6>
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
          </div> */}
        <div className="w-[740px] bg-lightblue mx-auto">
          <div>
            <h6 className="text-start font-semibold text-lg font-nunito">Linked Cards</h6>
            {cardsample && cardsample?.length > 0 ? (
              <>
                {cardsample?.map((card, idx) => (
                  <div
                    key={idx * 19}
                    className="grid grid-cols-4 text-secondary-800 font-mulish mt-1 last:border-b-0 border-b border-gray-300"
                  >
                    <div className="font-nunito">{card.card_holder}</div>
                    <div className="font-nunito">Card: ending with {card.card_ending}</div>
                    <div className="text-end font-nunito">Expires on {card.expiry}</div>
                    <div className="text-end font-nunito cursor-pointer hover:text-blue-600">Remove</div>
                  </div>
                ))}
              </>
            ) : (
              <p className="flex justify-center items-center mt-5 font-mulish text-sm">
                No Linked Cards
              </p>
            )}
          </div>
          <div className="mt-10">
            <h6 className="text-start font-semibold text-lg font-nunito">Billing History</h6>
            {billings && billings?.length > 0 ? (
              <>
                <div className="max-h-[200px] pn_scroller overflow-y-auto">
                  {billings?.map((billing, idx) => (
                    <div
                      key={idx * 19}
                      className="grid grid-cols-4 text-secondary-800 font-mulish mt-1"
                    >
                      <div>
                        {billing.final_payment_info.amount === 99500 ? (
                          <span className="font-nunito">Pro Plan</span>
                        ) : (
                          <span className="font-nunito">Premium Plan</span>
                        )}
                      </div>
                      <div className="font-nunito">{billing.status}</div>
                      <div className="font-nunito">${billing.final_payment_info.amount / 100}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="flex justify-center items-center mt-5 font-mulish text-sm">
                No Billing History{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
