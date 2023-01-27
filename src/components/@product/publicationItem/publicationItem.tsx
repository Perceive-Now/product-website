import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

//
import { BookmarkIcon, CitationIcon, ShareIcon } from "../../icons";

/*
 *
 **/
export default function PublicationItem(props: IPublicationItemProps) {
  return (
    <Link to={`/deep-search/publications/${encodeURIComponent(props.id)}`}>
      <div key={props.id} className="mb-4">
        <div className="text-xl font-medium text-primary-900 truncate mb-1 cursor-pointer">
          {props.title}
        </div>

        {props.abstract && (
          <div className="text-appGray-900 mb-1 line-clamp-2">
            {props.abstract}
          </div>
        )}

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
  title: string;
  abstract?: string;
  doiUrl: string;
  id: string;
}
