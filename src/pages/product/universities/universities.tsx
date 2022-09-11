import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

/**
 *
 */
export default function UniversitiesPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const joinedKeywords = searchedKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
      </div>

      {searchedKeywords && searchedKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">
              Showing top universities trends for:
            </span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle
              title="Most recent publications by academic experts"
              subTitle="The top universities are located in Australia, Great Britain, Swizerland, and the United States. The top 3 leading universities are University College London, University of Southern California and Harvard Medical School."
              learnMore="Learn more"
            />
          </div>
        </div>
      )}
    </div>
  );
}
