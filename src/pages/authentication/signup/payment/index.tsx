import { useState } from "react";
import SignUpLayout from "../_components/layout";
import { inputArrow } from "../_assets";
import CreditCardForm from "./_forms/credit-card";
import BankTransferForm from "./_forms/bank-transfer";
import WireTransfer from "./_forms/wire-transfer";
import Button from "src/components/reusable/button";
import { useNavigate } from "react-router-dom";

type FieldExpanded = {
  paymentMethod: boolean;
  reviewSelection: boolean;
};

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [expanded, setExpanded] = useState<FieldExpanded>({
    paymentMethod: false,
    reviewSelection: false,
  });

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleFieldExpand = (field: keyof FieldExpanded) => {
    setExpanded((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <SignUpLayout currentStep={3} completedSteps={[0, 1, 2]}>
      <div className="max-w-[800px] p-7 space-y-[40px]">
        {/* Title */}
        <h1 className="text-[20px] font-semibold text-[#373D3F]">Payment</h1>

        {/* Payment Method Dropdown */}
        <div className="flex flex-col space-y-[8px]">
          <div
            className={`cursor-pointer w-full flex items-center h-[48px] border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none ${
              expanded.paymentMethod && "flex-col min-h-fit p-2"
            }`}
          >
            <div className="flex items-center w-full">
              {expanded.paymentMethod
                ? "How Would You Like to Pay?"
                : "Select your payment method."}
              <img
                src={inputArrow}
                alt="input-arrow"
                className={`ml-auto ${expanded.paymentMethod && "rotate-180"}`}
                onClick={() => handleFieldExpand("paymentMethod")}
              />
            </div>
            <div className={`w-full ${expanded.paymentMethod ? "block" : "hidden"}`}>
              <div className="grid grid-cols-3 items-start">
                {/* plan selection info  */}
                <div className="flex flex-col space-y-1 mt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-[#4F4F4F]">Selected Plans</p>
                    <div className="bg-gray-200 p-1 w-fit rounded-md">Professional</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-[#4F4F4F]">Total Cost</p>
                    <div className="bg-gray-200 p-1 w-fit rounded-md">$499/month</div>
                  </div>
                </div>
                <div className="col-span-2 mt-3 px-7">
                  <div>
                    <div className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        onClick={() => setPaymentMethod("credit-card")}
                      />
                      <label>Credit/Debit Card</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        onClick={() => setPaymentMethod("bank-transfer")}
                      />
                      <label>Bank Transfer</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wire-transfer"
                        onClick={() => setPaymentMethod("wire-transfer")}
                      />
                      <label>Wire Transfer</label>
                    </div>
                  </div>
                  {/* Conditional Fields based on Payment Method */}
                  {paymentMethod === "credit-card" && <CreditCardForm />}

                  {paymentMethod === "bank-transfer" && <BankTransferForm />}

                  {paymentMethod === "wire-transfer" && <WireTransfer />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Selection Dropdown */}
        <div className="flex flex-col space-y-[8px]">
          <div
            className={`cursor-pointer w-full flex items-center h-[48px] border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none ${
              expanded.reviewSelection && "flex-col min-h-fit p-2"
            }`}
          >
            <div className="flex items-center w-full">
              {expanded.reviewSelection
                ? "All Set to Move to the Next Step?"
                : "Review your selection before proceeding."}
              <img
                src={inputArrow}
                alt="input-arrow"
                className={`ml-auto ${expanded.reviewSelection && "rotate-180"}`}
                onClick={() => handleFieldExpand("reviewSelection")}
              />
            </div>
            <div className={`w-full ${expanded.reviewSelection ? "block" : "hidden"}`}>
              <div className="flex flex-col gap-y-1 mt-3">
                <div className="grid grid-cols-2 max-w-[70%]">
                  <p className="text-[16px] text-[#373D3F]">Selected Plans</p>
                  <div className="bg-[#E8EAF2] p-1 w-fit rounded-md text-[#373D3F]">
                    Professional
                  </div>
                </div>
                <div className="grid grid-cols-2 max-w-[70%]">
                  <p className="text-[16px] text-[#373D3F]">Total Cost</p>
                  <div className="bg-[#E8EAF2] p-1 w-fit rounded-md text-[#373D3F]">$499/month</div>
                </div>
                <div className="grid grid-cols-2 max-w-[70%]">
                  <p className="text-[16px] text-[#373D3F]">Payment Method</p>
                  <div className="bg-[#E8EAF2] p-1 w-fit rounded-md text-[#373D3F]">
                    {paymentMethod === "credit-card" && "Credit Card ending in 1234"}
                    {paymentMethod === "bank-transfer" && "Bank Transfer"}
                    {paymentMethod === "wire-transfer" && "Wire Transfer"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start space-x-[16px]">
          <div className="flex flex-row gap-x-1 mt-3">
            <div>
              <Button
                type="secondary"
                classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
                rounded="full"
                handleClick={() => navigate("/signup/plan")}
              >
                <span className="font-normal">Back</span>
              </Button>
            </div>

            <div>
              <Button
                classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
                rounded="full"
                handleClick={() => navigate("/signup/team")}
              >
                <span className="font-normal">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default PaymentScreen;
