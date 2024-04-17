import { useForm } from "react-hook-form";
import Button from "../reusable/button";
import Input from "../reusable/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback } from "react";
import axios from "axios";

interface Props {
  setEdit: (edit: boolean) => void;
  query: string;
  updateQuery: () => void;
}

const EditQuery = ({ setEdit, updateQuery, query }: Props) => {
  const formInitialValue = {
    query: query || "",
  };

  const formResolver = yup.object().shape({
    query: yup.string(),
  });

  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(updateQuery)} className="w-full">
      <Input
        register={register("query")}
        type="text"
        // placeholder="First Name"
        error={errors.query}
      />
      <div className="flex items-center gap-2 mt-1">
        <Button
          handleClick={() => setEdit(false)}
          htmlType="button"
          type={"default"}
          size="default"
          classname="text-primary-900"
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          type={"primary"}
          size={"small"}
          classname="text-sm"
          rounded="small"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditQuery;
