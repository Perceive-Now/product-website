import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import Modal from "../reusable/modal";
import Input from "../reusable/input";
import Button from "../reusable/button";
import IconButton from "../reusable/icon-button";

import { CrossIcon } from "../icons";
import axiosInstance from "../../utils/axios";
import { Auth_CODE } from "../../utils/constants";
import toast from "react-hot-toast";

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
  const [current, setCurrent] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmpassword] = useState(false);

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
    reset,
    watch,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const onContinue = useCallback(
    async (value: IPassword) => {
      const values = {
        new_password: value.new_password,
        current_password: value.current_password,
      };
      try {
        const response = await axiosInstance.post(
          `/api/reset_password?code=${Auth_CODE}&clientId=default`,
          values,
        );
        reset();
        toast.success(response.data.message || "Password updated successfully");
      } catch (error: any) {
        toast.error(error.response.data.error || "Something went wrong");
      }
    },
    [reset],
  );

  const currentPassword = watch("current_password");
  const NewPassword = watch("new_password");
  const ConfirmPassword = watch("confirm_password");

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
              type={current ? "text" : "password"}
              placeholder="Current password"
              error={errors.current_password}
              showPassword={() => setCurrent(!current)}
              watch={currentPassword}
              visible={current}
            />
          </fieldset>
          <fieldset className="relative">
            <Input
              register={register("new_password")}
              type={newPassword ? "text" : "password"}
              placeholder="New password"
              error={errors.new_password}
              showPassword={() => setNewPassword(!newPassword)}
              watch={NewPassword}
              visible={newPassword}
            />
          </fieldset>
          <fieldset>
            <Input
              register={register("confirm_password")}
              type={confirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              error={errors.confirm_password}
              showPassword={() => setConfirmpassword(!confirmPassword)}
              watch={ConfirmPassword}
              visible={confirmPassword}
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
