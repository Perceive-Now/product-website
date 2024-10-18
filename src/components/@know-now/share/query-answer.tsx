import sanitizeHtml from "sanitize-html";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PN from "../../../assets/images/pn.svg";
import "../style.css";

interface Props {
  answer: string;
}

const QueryAnswer = ({ answer }: Props) => {
  const formattedAnswer = answer
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');

  const sanitizedAnswer = sanitizeHtml(formattedAnswer, {
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
      "img",
      "span",
      "div",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    transformTags: {
      img: (tagName, attribs) => {
        attribs.width = attribs.width || "800";
        attribs.height = attribs.height || "200";
        return { tagName, attribs };
      },
    },
  });

  return (
    <div className="flex items-start gap-3">
      <div className="p-1 shrink-0 rounded-full bg-appGray-100">
        <img className="h-full w-full" src={PN} alt="Pn" />
      </div>
      <div className="w-full">
        <DndProvider backend={HTML5Backend}>
          <div className="relative">
            <div
              style={{ textAlign: "justify" }}
              className="text-secondary-800 relative bottom-0 duration-500 delay-500 whitespace-pre-wrap stream-answer"
              dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
            />
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default QueryAnswer;
