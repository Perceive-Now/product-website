export default function PageTitle(props: IPageTitleProps) {
  return (
    <div className="py-1">
      <div className="flex justify-between">
        <p className="text-[22px] text-primary-900">{props.title}</p>

        {props.learnMore && (
          <div>
            {/* TODO:: Need to add popup here */}
            <p className="text-primary-500 cursor-pointer">Learn more</p>
          </div>
        )}
      </div>

      {props.subTitle && (
        <p className="mt-1 text-md text-gray-700">
          <span>{props.subTitle}</span>
        </p>
      )}
    </div>
  );
}

interface IPageTitleProps {
  title: string;
  subTitle?: string;
  learnMore?: string;
}
