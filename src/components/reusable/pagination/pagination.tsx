import classNames from "classnames";
import { Fragment, useMemo } from "react";

//
import { ChevronLeft, ChevronRight } from "../../icons";

/*
 *
 **/
export default function Pagination({
  pageNum,
  visiblePageNumbers = 10,
  totalCount,
  pageSize = 10,
  gotoPage,
}: IPagination) {
  const pageCountArray = useMemo(
    () =>
      Array.from({ length: Math.ceil(totalCount / pageSize) }, (v, i) => i + 1),
    [pageSize, totalCount]
  );

  const isPageNumInVisibleRange = pageNum < visiblePageNumbers;
  const totalPages = pageCountArray.length;

  let NeighbourRange = 0;
  let lowerNeighbourPageArray: number[] = [];
  let higherNeighbourPageArray: number[] = [];

  if (!isPageNumInVisibleRange) {
    NeighbourRange = Math.ceil(visiblePageNumbers / 2);
    for (let i = 1; i <= NeighbourRange; i++) {
      const lowerNeighbourPage = pageNum - i;
      const higherNeighbourPage = pageNum + i;
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

  const disablePrev = pageNum === 1;
  const disableNext = pageNum === totalPages;

  return (
    <div className="flex items-center text-primary-900">
      <div
        className={classNames(
          "mr-2",
          disablePrev ? "cursor-not-allowed text-primary-50" : "cursor-pointer"
        )}
        onClick={() => {
          if (disablePrev) {
            return;
          }
          gotoPage(pageNum - 1);
        }}
      >
        <ChevronLeft />
      </div>

      {isPageNumInVisibleRange ? (
        <Fragment>
          {pageCountArray
            .filter((_, index) => index < visiblePageNumbers)
            .map((count) => (
              <div
                key={count}
                className={classNames(
                  "mr-2 cursor-pointer",
                  count === pageNum ? "font-bold" : ""
                )}
                onClick={() => gotoPage(count)}
              >
                {count}
              </div>
            ))}
          {totalPages > visiblePageNumbers && (
            <div className="mr-2 cursor-pointer">...</div>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {hasLowerPages && <div className="mr-2 cursor-pointer">...</div>}

          {/* Lower page numbers */}
          {lowerNeighbourPageArray.map((lowerNeighbourPage) => {
            return (
              <div
                key={lowerNeighbourPage}
                className="mr-2 cursor-pointer"
                onClick={() => gotoPage(lowerNeighbourPage)}
              >
                {lowerNeighbourPage}
              </div>
            );
          })}

          {/* active page number */}
          <div className={"mr-2 cursor-pointer font-bold"}>{pageNum}</div>

          {/* Higher page numbers */}
          {higherNeighbourPageArray.map((higherNeighbourPage) => {
            return (
              <div
                key={higherNeighbourPage}
                className="mr-2 cursor-pointer"
                onClick={() => gotoPage(higherNeighbourPage)}
              >
                {higherNeighbourPage}
              </div>
            );
          })}

          {hasHigherPages && <div className="mr-2 cursor-pointer">...</div>}
        </Fragment>
      )}

      <div
        className={classNames(
          "mr-2",
          disableNext ? "cursor-not-allowed text-primary-50" : "cursor-pointer"
        )}
        onClick={() => {
          if (disableNext) {
            return;
          }
          gotoPage(pageNum + 1);
        }}
      >
        <ChevronRight />
      </div>
    </div>
  );
}

interface IPagination {
  pageNum: number; // current page number
  visiblePageNumbers?: number; // number that is visible in pagination if 5 then 1 to max 5 will be visible in pagination
  totalCount: number; // total number of items
  pageSize?: number; // total number of items to show
  gotoPage: (page: number) => void;
}