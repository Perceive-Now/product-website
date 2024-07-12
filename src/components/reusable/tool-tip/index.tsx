import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling
import "./tooltip.css"; // import custom styles

type Placement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface Props {
  children: any;
  title: string;
  placement?: Placement;
}

const ToolTip = ({ children, title, placement = "top" }: Props) => {
  return (
    <Tippy
      content={title}
      className="pn-tooltip-theme text-justify"
      placement={placement}
      // visible={true}
    >
      <span className="text-justify">{children}</span>
    </Tippy>
  );
};

export default ToolTip;
