import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Countries, US_STATES } from "src/utils/constants";

// Define form data type
interface CreditCardFormData {
  cardholderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
}

// Yup validation schema
const schema = yup.object({
  cardholderName: yup.string().required("Cardholder name is required"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be MM/YY")
    .required("Expiry date is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  postalCode: yup
    .string()
    .matches(/^\d{5,6}$/, "Postal code must be 5-6 digits")
    .required("Postal code is required"),
  address: yup.string().required("Address is required"),
});

const CreditCardForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreditCardFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validate on input blur
  });

  const onSubmit: SubmitHandler<CreditCardFormData> = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  const country = watch("country"); // To dynamically handle US states

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 mt-2">
      {/* Card Details */}
      <div>
        <label className="text-base text-[#4F4F4F]">Cardholder Name</label>
        <input
          type="text"
          placeholder="Cardholder Name"
          {...register("cardholderName")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
        />
        <p className="text-red-500 text-sm">{errors.cardholderName?.message}</p>
      </div>

      <div>
        <label className="text-base text-[#4F4F4F]">Card Number</label>
        <input
          type="number"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          {...register("cardNumber")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
        />
        <p className="text-red-500 text-sm">{errors.cardNumber?.message}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <label className="text-base text-[#4F4F4F]">CVV</label>
          <input
            type="number"
            placeholder="CVV"
            {...register("cvv")}
            className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          />
          <p className="text-red-500 text-sm">{errors.cvv?.message}</p>
        </div>
        <div>
          <label className="text-base text-[#4F4F4F]">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            {...register("expiryDate")}
            className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          />
          <p className="text-red-500 text-sm">{errors.expiryDate?.message}</p>
        </div>
      </div>

      {/* Billing Address */}
      <h2 className="text-[16px] font-semibold text-[#4F4F4F]">Billing Address</h2>
      <div className="grid grid-cols-2 gap-x-1">
        <div>
          <label className="text-base text-[#4F4F4F]">Country</label>
          <select
            {...register("country")}
            className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          >
            <option value="">Select Country</option>
            {Countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.country?.message}</p>
        </div>

        <div>
          <label className="text-base text-[#4F4F4F]">State</label>
          {country === "United States" ? (
            <select
              {...register("state")}
              className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
            >
              <option value="">Select State</option>
              {Object.entries(US_STATES).map(([key, state]) => (
                <option key={key} value={key}>
                  {state}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="State"
              {...register("state")}
              className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
            />
          )}
          <p className="text-red-500 text-sm">{errors.state?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-1">
        <div>
          <label className="text-base text-[#4F4F4F]">City</label>
          <input
            type="text"
            placeholder="City"
            {...register("city")}
            className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          />
          <p className="text-red-500 text-sm">{errors.city?.message}</p>
        </div>

        <div>
          <label className="text-base text-[#4F4F4F]">Postal Code</label>
          <input
            type="number"
            placeholder="Postal Code"
            {...register("postalCode")}
            className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          />
          <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
        </div>
      </div>
      <div>
        <label className="text-base text-[#4F4F4F]">Address</label>
        <textarea
          placeholder="123 Main Street"
          {...register("address")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
          cols={30}
        ></textarea>
        <p className="text-red-500 text-sm">{errors.address?.message}</p>
      </div>
    </form>
  );
};

export default CreditCardForm;
