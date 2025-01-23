import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define the data type for the form fields
interface BankTransferFormData {
  accountHolderName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
}

// Yup validation schema
const schema = yup.object({
  accountHolderName: yup.string().required("Account Holder Name is required"),
  bankAccountNumber: yup
    .string()
    .matches(/^\d{8,16}$/, "Bank Account Number must be 8-16 digits")
    .required("Bank Account Number is required"),
  bankRoutingNumber: yup
    .string()
    .matches(/^\d{9}$/, "Routing Number must be 9 digits")
    .required("Bank Routing Number is required"),
});

const BankTransferForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankTransferFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validate on input blur
  });

  const onSubmit: SubmitHandler<BankTransferFormData> = (data) => {
    console.log("Bank Transfer Details:", data);
    alert("Bank Transfer Details Submitted Successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <div className="mt-2">
        <label htmlFor="accountHolderName" className="text-[16px] text-[#4F4F4F]">
          Account Holder Name
        </label>
        <input
          type="text"
          placeholder="Account Holder Name"
          {...register("accountHolderName")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
        />
        <p className="text-red-500 text-sm">{errors.accountHolderName?.message}</p>
      </div>

      <div>
        <label htmlFor="bankAccountNumber" className="text-[16px] text-[#4F4F4F]">
          Bank Account Number
        </label>
        <input
          type="text"
          placeholder="xxxx xxxx xxxx xxxx"
          {...register("bankAccountNumber")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
        />
        <p className="text-red-500 text-sm">{errors.bankAccountNumber?.message}</p>
      </div>

      <div>
        <label htmlFor="bankRoutingNumber" className="text-[16px] text-[#4F4F4F]">
          Bank Routing Number
        </label>
        <input
          type="text"
          placeholder="xxxx xxxx xxxx xxxx"
          {...register("bankRoutingNumber")}
          className="w-full p-1 text-sm border-[1px] border-[#87888C] rounded-lg px-[15px] text-[16px] bg-[#FCFCFC] text-[#4F4F4F] outline-none"
        />
        <p className="text-red-500 text-sm">{errors.bankRoutingNumber?.message}</p>
      </div>
      <div className="flex items-start py-2 space-x-2">
        <input type="checkbox" id="authorize" className="h-[16px] w-[16px] mt-[5px] border-[#87888C]" />
        <label htmlFor="authorize" className="text-[14px] text-[#4F4F4F]">
          I authorize Perceive Now to debit my account electronically until I revoke this
          authorization in writing.
        </label>
      </div>
    </form>
  );
};

export default BankTransferForm;
