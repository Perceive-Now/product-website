interface Props {
  width: number;
}

const DefaultProgressBar = ({ width }: Props) => {
  return (
    <div className="w-full bg-primary-900 h-1 my-3">
      <div className="h-full bg-secondary-500" style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default DefaultProgressBar;
