/**
 * CREDITS: https://mantine.dev
 * Code has been directly copied from mantine's Github repo and adapted to the project as necessary
 */
import classNames from "classnames";

//
import { ChevronLeft, ChevronRight } from "../../icons";

//
import { usePagination } from "../../../hooks/usePagination";

export interface PaginationProps {
  /** Active initial page for uncontrolled component */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page */
  siblings?: number;

  /** Amount of elements visible on left/right edges */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;

  /** Determines whether all controls should be disabled */
  disabled?: boolean;
}

export default function Pagination(props: PaginationProps) {
  const { page, total, onChange, disabled } = props;

  const siblings = props.siblings ?? 1;
  const boundaries = props.boundaries ?? 2;
  const initialPage = props.initialPage ?? 1;

  const { range, setPage, next, previous, active } = usePagination({
    page,
    siblings,
    total,
    onChange,
    initialPage,
    boundaries,
  });

  if (total <= 0) {
    return null;
  }

  const items = range.map((pageNumber, index) => (
    <button
      className={classNames(
        "w-3",
        pageNumber === page ? "font-bold text-primary-600" : "text-gray-500",
      )}
      key={index}
      disabled={disabled}
      onClick={pageNumber !== "dots" ? () => setPage(pageNumber) : undefined}
    >
      {pageNumber === "dots" ? "..." : pageNumber}
    </button>
  ));

  //
  return (
    <div className="flex gap-x-1">
      <button
        disabled={active === 1 || disabled}
        onClick={previous}
        className={active === 1 ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <ChevronLeft />
      </button>

      {items}

      <button
        disabled={active === total || disabled}
        onClick={next}
        className={active === total ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
