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
  tooltipClose?: boolean;
}

const ToolTip = ({ children, title, placement = "top", tooltipClose = false }: Props) => {
  return (
    <Tippy
      content={title}
      className={`pn-tooltip-theme text-justify ${tooltipClose && "pn-tooltip-close"}`}
      placement={placement}
      // visible={true}
    >
      <span className="text-justify">{children}</span>
    </Tippy>
  );
};

export default ToolTip;
