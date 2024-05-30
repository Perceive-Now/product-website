import * as yup from "yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../reusable/button";
import Input from "../reusable/input";

import { useAppDispatch } from "../../hooks/redux";
import { setUpdateQuery } from "../../stores/know-now";

interface Props {
  setEdit: (edit: boolean) => void;
  onCancel: any;
  query: string;
  updateQuery: (query: string) => void;
  editIndex?: any;
  setEditIndex?: any;
  setQuery?: any;
}

const EditQuery = ({ onCancel, query, updateQuery, editIndex, setEdit }: Props) => {
  const dispatch = useAppDispatch();

  const formInitialValue = {
    query: query || "",
  };

  const formResolver = yup.object().shape({
    query: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const onUpdateQuery = useCallback(
    (value: any) => {
      dispatch(setUpdateQuery({ editIndex: editIndex, query: value.query }));
      setEdit(false);
      updateQuery(value.query);
    },
    [dispatch, editIndex, setEdit, updateQuery],
  );

  return (
    <form onSubmit={handleSubmit(onUpdateQuery)} className="w-full">
      <Input register={register("query")} type="text" error={errors.query} />
      <div className="flex items-center gap-2 mt-1">
        <Button
          handleClick={onCancel}
          htmlType="button"
          type={"default"}
          size="default"
          classname="text-primary-900 text-xs"
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          type={"primary"}
          size={"small"}
          classname="text-xs"
          rounded="small"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditQuery;
