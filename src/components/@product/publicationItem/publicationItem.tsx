import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

//
import { IPublicationItem } from "../../../utils/api/advance-search";

//
import { BookmarkIcon, CitationIcon, ShareIcon } from "../../icons";

/*
 *
 **/
function PublicationItem(props: IPublicationItemProps) {
  const title = props.data.title[0] ?? "";

  return (
    <Link to={encodeURIComponent(props.data.doi)}>
      <div key={props.data.doi} className="mb-4">
        <div className="text-xl font-medium text-primary-900 truncate mb-1 cursor-pointer">
          {title}
        </div>

        <div className="text-appGray-900 mb-1 line-clamp-2">
          {props.data.abstract}
        </div>

        <div className="flex">
          <ActionButton>
            <BookmarkIcon className="mr-1" />
            <span>Bookmark</span>
          </ActionButton>

          <ActionButton>
            <CitationIcon className="mr-1" />
            <span>Generate citation</span>
          </ActionButton>

          <ActionButton>
            <ShareIcon className="mr-1" />
            <span>Share</span>
          </ActionButton>
        </div>
      </div>
    </Link>
  );
}

export const ActionButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="mr-4 flex items-center text-primary-900 font-medium cursor-pointer">
      {children}
    </div>
  );
};

interface IPublicationItemProps {
  data: IPublicationItem;
}

export default PublicationItem;
