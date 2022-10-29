import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

//
import { IPublicationData } from "../../../pages/product/publications/publications";

//
import { BookmarkIcon, CitationIcon, ShareIcon } from "../../icons";

/*
 *
 **/
function PublicationItem({ data }: IPublicationItem) {
  return (
    <Link to={`${data.id}`}>
      <div key={data.id} className="mb-4">
        <div className="text-xl font-medium text-primary-900 truncate mb-1 cursor-pointer">
          {data.title}
        </div>

        <div className="text-appGray-900 mb-1 line-clamp-2">
          {data.description}
        </div>

        <div className="flex">
          <ActionButton>
            <BookmarkIcon className="mr-1" /> Bookmark
          </ActionButton>

          <ActionButton>
            <CitationIcon className="mr-1" />
            Generate citation
          </ActionButton>

          <ActionButton>
            <ShareIcon className="mr-1" />
            Share
          </ActionButton>
        </div>
      </div>
    </Link>
  );
}

export default PublicationItem;

interface IPublicationItem {
  data: IPublicationData;
}

export const ActionButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="mr-4 flex items-center text-primary-900 font-medium cursor-pointer">
      {children}
    </div>
  );
};
