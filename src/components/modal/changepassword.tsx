/* eslint-disable no-console */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import Modal from "../reusable/modal";
import Input from "../reusable/input";
import Button from "../reusable/button";
import IconButton from "../reusable/icon-button";

import { CrossIcon } from "../icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface IPassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const ChangePasswordModal = ({ open, onClose }: Props) => {
  const formInitialValue: IPassword = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const formResolver = yup.object().shape({
    current_password: yup.string().required("Current password is required"),
    new_password: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      ),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const onContinue = useCallback(() => {
    console.log("Password");
  }, []);

  return (
    <Modal open={open} handleOnClose={onClose}>
      <div className="bg-white p-[20px] pb-[40px] text-start w-[440px] rounded-lg">
        <div className="flex justify-between">
          <div className="mb-2">
            <h6 className="text-2xl text-secondary-800 font-semibold">Change password</h6>
            <p className="text-secondary-800 text-sm leading-[24px]">
              Password must contain: Min 8 characters, at least one lower case, one upper case, one
              special character and one number.
            </p>
          </div>
          <IconButton
            color={"default"}
            icon={<CrossIcon className="text-black" />}
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit(onContinue)} className="space-y-2.5">
          <fieldset>
            <Input
              register={register("current_password")}
              type="text"
              placeholder="Current password"
              error={errors.current_password}
            />
          </fieldset>
          <fieldset>
            <Input
              register={register("new_password")}
              type="text"
              placeholder="New password"
              error={errors.new_password}
            />
          </fieldset>
          <fieldset>
            <Input
              register={register("confirm_password")}
              type="text"
              placeholder="Confirm password"
              error={errors.confirm_password}
            />
          </fieldset>
          <Button classname="w-full" loading={isSubmitting} htmlType="submit" size="small">
            Change Password
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
