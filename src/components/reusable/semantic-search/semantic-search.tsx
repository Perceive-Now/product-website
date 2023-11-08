import { FunctionComponent } from "react";
import Button from "../button";

interface Props {
  initialValue?: IKeywordOption[];
}

export interface IKeywordOption {
  value: string;
  label: string;
}

export const SemanticSearch: FunctionComponent<Props> = ({ initialValue }) => {
  return (
    <>
      <div className="border border-gray-300 shadow p-1">
        {initialValue?.map((value) => (
          <span key={value.value}>{value.label}</span>
        ))}
        <div className="text-right">
          <Button
            htmlType={"button"}
            rounded={"small"}
            size={"small"}
            classname={"px-3 py-1 text-sm font-semibold"}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};
