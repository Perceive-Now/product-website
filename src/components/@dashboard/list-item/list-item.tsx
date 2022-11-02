function ListItem(props: IListItemProps) {
  return (
    <div className="grid grid-cols-12 gap-x-2 border rounded-full shadow-md mb-2 px-2 py-1">
      <div className="col-span-1 font-bold text-primary-600 flex items-center">
        0{props.index + 1}
      </div>
      <div className="col-span-10">{props.name}</div>
      <div className="col-span-1 pr-1 flex items-center justify-end">
        {props.value.toLocaleString()}
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
