import classNames from "classnames";

function ListItem(props: IListItemProps) {
  return (
    <div className="grid grid-cols-12 gap-x-2 border rounded-full shadow-md mb-2 px-2 py-1">
      <div
        className={classNames("col-span-1 font-bold flex items-center font-sans", {
          "text-primary-100": props.index === 0,
          "text-primary-500": props.index === 1,
          "text-primary-600": props.index === 2,
          "text-primary-800": props.index === 3,
          "text-primary-900": props.index === 4,
        })}
      >
        0{props.index + 1}
      </div>
      <div className="col-span-9">{props.name}</div>
      <div className="col-span-2 pr-1 flex items-center justify-end">
        {props.value?.toLocaleString()}
      </div>
    </div>
  );
}

interface IListItemProps {
  name: string;
  value: number;
  index: number;
}

export default ListItem;
