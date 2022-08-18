export default function PageTitle(props: IPageTitleProps) {
  return (
    <div className="flex justify-between py-1">
      <p className="text-xl text-primary-900">{props.title}</p>

      {props.learnMore && (
        <div>
          {/* TODO:: Need to add popup here */}
          <p className="text-primary-500 cursor-pointer">Learn more</p>
        </div>
      )}
    </div>
  );
}

interface IPageTitleProps {
  title: string;
  learnMore?: string;
}
