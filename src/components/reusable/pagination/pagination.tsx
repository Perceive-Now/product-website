import classNames from "classnames";
import { Fragment, useMemo } from "react";

//
import { ChevronLeft, ChevronRight } from "../../icons";

/**
 *
 */
export default function Pagination(props: IPagination) {
  const {
    currentPage,
    visiblePageNumbers = 10,
    totalCount,
    pageSize = 10,
    gotoPage,
  } = props;

  const pageCountArray = useMemo(
    () =>
      Array.from({ length: Math.ceil(totalCount / pageSize) }, (v, i) => i + 1),
    [pageSize, totalCount]
  );

  const isPageNumInVisibleRange = currentPage < visiblePageNumbers;
  const totalPages = pageCountArray.length;

  let NeighbourRange = 0;
  let lowerNeighbourPageArray: number[] = [];
  let higherNeighbourPageArray: number[] = [];

  if (!isPageNumInVisibleRange) {
    NeighbourRange = Math.ceil(visiblePageNumbers / 2);

    for (let i = 1; i <= NeighbourRange; i++) {
      const lowerNeighbourPage = currentPage - i;
      const higherNeighbourPage = currentPage + i;

      if (lowerNeighbourPage >= 1) {
        lowerNeighbourPageArray.push(lowerNeighbourPage);
      }

      if (higherNeighbourPage <= totalPages) {
        higherNeighbourPageArray.push(higherNeighbourPage);
      }
    }
    lowerNeighbourPageArray = lowerNeighbourPageArray.reverse();
  }

  const hasLowerPages = lowerNeighbourPageArray[0] > 1;
  const hasHigherPages =
    higherNeighbourPageArray[higherNeighbourPageArray.length - 1] < totalPages;

  const disablePrev = currentPage === 1;
  const disableNext = currentPage === totalPages;

  return (
    <div className="flex items-center text-primary-900">
      <div
        className={classNames(
          "mr-2",
          disablePrev ? "cursor-not-allowed text-primary-50" : "cursor-pointer"
        )}
        onClick={() => {
          if (disablePrev) return;
          gotoPage(currentPage - 1);
        }}
      >
        <ChevronLeft />
      </div>

      {isPageNumInVisibleRange && (
        <Fragment>
          {pageCountArray
            .filter((_, index) => index < visiblePageNumbers)
            .map((count) => (
              <div
                key={count}
                className={classNames(
                  "mr-2 cursor-pointer",
                  count === currentPage ? "font-bold" : "text-gray-500"
                )}
                onClick={() => gotoPage(count)}
              >
                {count}
              </div>
            ))}
          {totalPages > visiblePageNumbers && (
            <div className="mr-2 cursor-pointer text-gray-500">...</div>
          )}
        </Fragment>
      )}

      {!isPageNumInVisibleRange && (
        <Fragment>
          {hasLowerPages && <div className="mr-2 cursor-pointer text-gray-500">...</div>}

          {/* Lower page numbers */}
          {lowerNeighbourPageArray.map((lowerNeighbourPage) => (
            <div
              key={lowerNeighbourPage}
              className="mr-2 cursor-pointer text-gray-500"
              onClick={() => gotoPage(lowerNeighbourPage)}
            >
              {lowerNeighbourPage}
            </div>
          ))}

          {/* active page number */}
          <div className={"mr-2 cursor-pointer font-bold"}>{currentPage}</div>

          {/* Higher page numbers */}
          {higherNeighbourPageArray.map((higherNeighbourPage) => (
            <div
              key={higherNeighbourPage}
              className="mr-2 cursor-pointer text-gray-500"
              onClick={() => gotoPage(higherNeighbourPage)}
            >
              {higherNeighbourPage}
            </div>
          ))}

          {hasHigherPages && <div className="mr-2 cursor-pointer text-gray-500">...</div>}
        </Fragment>
      )}

      <div
        className={classNames(
          "mr-2",
          disableNext ? "cursor-not-allowed text-primary-50" : "cursor-pointer"
        )}
        onClick={() => {
          if (disableNext) return;
          gotoPage(currentPage + 1);
        }}
      >
        <ChevronRight />
      </div>
    </div>
  );
}

interface IPagination {
  currentPage: number; // current page number
  visiblePageNumbers?: number; // number that is visible in pagination if 5 then 1 to max 5 will be visible in pagination
  totalCount: number; // total number of items
  pageSize?: number; // total number of items to show
  gotoPage: (page: number) => void;
}
