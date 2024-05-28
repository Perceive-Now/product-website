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
  query: string;
  updateQuery: () => void;
  editIndex?: any;
  setEditIndex?: any;
  setQuery?: any;
}

const EditQuery = ({ setEdit, query, updateQuery, editIndex, setQuery }: Props) => {
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
      // if (editIndex) {
      // setEditIndex(editIndex)
      dispatch(setUpdateQuery({ editIndex: editIndex, query: value.query }));

      setEdit(false);
      setQuery(value.query);
      updateQuery();

      // }
    },
    [dispatch, editIndex, setEdit, setQuery, updateQuery],
  );

  return (
    <form onSubmit={handleSubmit(onUpdateQuery)} className="w-full">
      <Input register={register("query")} type="text" error={errors.query} />
      <div className="flex items-center gap-2 mt-1">
        <Button
          handleClick={() => setEdit(false)}
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
          disabled
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditQuery;
