import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../reusable/button";

import { useAppDispatch } from "../../hooks/redux";
import { setUpdateQuery } from "../../stores/know-now";
import classNames from "classnames";

interface Props {
  setEdit: (edit: boolean) => void;
  onCancel: any;
  query: string;
  updateQuery: (query: string, editIndex: number) => void;
  editIndex?: any;
  setEditIndex?: any;
  setQuery?: any;
}

const EditQuery = ({ onCancel, query, updateQuery, editIndex, setEdit }: Props) => {
  const dispatch = useAppDispatch();
  const [numberOfRows, setNumberOfRows] = useState(1);

  useEffect(() => {
    const lines = query.split("\n").length;
    setNumberOfRows(lines);
  }, [query]);

  const formInitialValue = {
    query: query || "",
  };

  const formResolver = yup.object().shape({
    query: yup.string(),
  });

  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const onUpdateQuery = useCallback(
    (value: any) => {
      if (value.query.trim()) {
        dispatch(setUpdateQuery({ editIndex: editIndex, query: value.query }));
        setEdit(false);
        updateQuery(value.query, editIndex);
      }
    },
    [dispatch, editIndex, setEdit, updateQuery],
  );

  return (
    <form onSubmit={handleSubmit(onUpdateQuery)} className="w-full h-full">
      <textarea
        rows={numberOfRows}
        {...register("query")}
        onChange={(e) => {
          const lines = e.target.value.split("\n").length;
          setNumberOfRows(lines);
        }}
        className={classNames(
          "appearance-none text-sm text-secondary-800 w-full border border-appGray-200 rounded-md placeholder:text-gray-400 placeholder:text-sm pn_scroller focus:border-appGray-200 focus-visible:border-appGray-200 focus:outline-none focus:ring-0 pr-6 pb-2 pl-1 pt-0.5",
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default behavior of Enter key
            if (query.trim()) {
              onUpdateQuery;
            }
          }
        }}
        placeholder="Start your query here"
        // disabled={isLoading}
      />
      {/* <Input register={register("query")} type="text" error={errors.query} /> */}
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
