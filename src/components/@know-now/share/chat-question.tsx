import UserIcon from "src/components/reusable/userIcon";

import { useAppSelector } from "src/hooks/redux";
import sanitizeHtml from "sanitize-html";

interface Props {
  query: string;
  userDetail: any;
}

const ChatQuery = ({ query, userDetail }: Props) => {
  const formattedQuery = query.replace(/\n/g, "<br>");

  const sanitizedQuery = sanitizeHtml(formattedQuery, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "br",
      "p",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href"],
    },
  });

  return (
    <div className="flex justify-between w-full gap-2.5">
      <div className="flex gap-3 w-full">
        <div className="shrink-0">
          <UserIcon
            first_name={userDetail?.first_name || "U"}
            last_name={userDetail?.last_name || ""}
            profile_photo={userDetail?.profile_photo}
          />
        </div>
        <div className="text-secondary-800" dangerouslySetInnerHTML={{ __html: sanitizedQuery }} />
      </div>
    </div>
  );
};

export default ChatQuery;
