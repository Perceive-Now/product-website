import Search, { IKeywordOption } from "../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { setDashboardSearch } from "../../../stores/dashboard";

import { CrossIcon, InfoIcon } from "../../../components/icons";

import Tooltip from "../../../components/reusable/popover";

import { setFilter } from "../../../stores/date";
import FilterList from "../../../components/icons/chooseplan/filter/ClassificationFilter";
import Button from "../../../components/reusable/button";
import { useNavigate } from "react-router-dom";

// type classificationMode = "ipc" | "cpc";

export const MALicensing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const paramsClassification: string | null = searchParams.get("mode");
  // const [classification, setClassification] = useState<classificationMode>("ipc");

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];

  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  const joinedkeywords = keywords.join(", ");

  // console.log(filterKeywords)

  //
  // const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");
  // const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  const filterClear = () => {
    dispatch(setFilter([]));
  };

  return (
    <div>
      <div>
        <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
          <div className="flex items-start justify-center gap-0.5 py-1">
            <p className="text-lg text-primary-900 fw-600">M&A Licensing</p>
            <Tooltip
              trigger={
                <p className="text-primary-500 cursor-pointer">
                  <span>
                    <InfoIcon className="w-2 h-2" />
                  </span>
                </p>
              }
            >
              Recusandae expedita natus nobis veritatis porro omnis fugit ratione, dolore commodi?
              Voluptate doloremque perspiciatis molestiae vitae explicabo atque velit deserunt
              minima provident ea. Tempora odit enim, facere quasi deleniti ab corporis, temporibus
              magnam, magni exercitationem error?
            </Tooltip>
          </div>
        </div>
      </div>
      {/* Search bar */}
      <div className="grid grid-cols-8 mb-2">
        <div className="col-span-7">
          <Search
            required
            size="small"
            className="w-full bg-white"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          {keywords.length > 0 ? (
            <div className="mt-2">
              <span>Showing patents for: </span>
              <span className="">"{joinedkeywords}"</span>&nbsp;
              {filteredKeywords.length > 0 && (
                <>
                  <span className="font-bold">in &nbsp;</span>
                  <div className="inline-flex items-center p-1 rounded-xl border border-gray-500 gap-1">
                    <span>{filterKeywords}</span>
                    <button type="button" onClick={filterClear}>
                      <CrossIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="mt-[4px] text-appGray-900">
              Search keywords e.g. “COVID-19” to see related patents.
            </p>
          )}
        </div>
      </div>
      <div className="flex  gap-2">
        {/* filter */}
        <div className="flex-shrink-0 w-[260px]">
          <div className=" bg-white shadow-lg rounded-lg">
            <div className="rounded-none rounded-t-lg w-full flex justify-between items-center bg-primary-900 py-[12px] px-[16px] text-white">
              <span>Filter</span>
            </div>
            <div className="">
              <FilterList filters={DateFiltersLists} filterName={"Date"} />
              <FilterList filters={countryLists} filterName={"Country"} />
              <FilterList filters={LegalStatus} filterName={"Legal Status"} />
              <FilterList filters={Types} filterName={"Type"} />
              <FilterList filters={ArtGroup} filterName={"Art group"} />
              <FilterList filters={Classifications} filterName={"Classification"} />
              <FilterList filters={Jurisdiction} filterName={"Jurisdiction"} />
              <FilterList filters={Names} filterName={"Inventor"} />
              <FilterList filters={Names} filterName={"Applicant"} />
              <FilterList filters={Names} filterName={"Patent Owner"} />
              <FilterList filters={Names} filterName={"Agents/ Attorney"} />
            </div>
          </div>
          {/* <div className="bg-white shadow rounded-lg mt-3">
            <div className="rounded-none rounded-t-lg w-full flex justify-between items-center bg-primary-900 py-[12px] px-[16px] text-white">
              <span>Related Keywords</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              {relatedKeywords.map((k, idx) => (
                <span
                  key={idx}
                  className="mt-1 text-primary-900 font-semibold bg-appGray-100 px-2 py-1 rounded-full"
                >
                  {k}
                </span>
              ))}
            </div>
          </div> */}
        </div>
        {/* summary */}
        <div className="w-full">
          <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
            <h2 className="text-lg font-bold text-primary-900">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-2">
              <div className="space-y-2">
                <p>
                  This analysis offers an in-depth examination of the Intellectual Property (IP)
                  licensing realm within the cardiac digital health monitors for pacemaker’s market.
                  Through the evaluation of past and present trajectories, this report seeks to
                  equip stakeholders with essential insights centering on prospective purchasers,
                  historical IP allocations among prominent entities, quarterly patterns in major
                  licensees over the preceding five years, and distinguished inventors involved in
                  licensing agreements. A sum of 1406 distinct incorporated entities has been
                  pinpointed, rooted in the IP licensing chronicle spanning the period 2018 to 2023
                  in the cardiac monitor industry for pacemakers.
                </p>
                <div>
                  <h6 className="font-bold">1. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
                <div>
                  <h6 className="font-bold">2. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
                <div>
                  <h6 className="font-bold">3. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h6 className="font-bold">4. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
                <div>
                  <h6 className="font-bold">5. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
                <div>
                  <h6 className="font-bold">6. National IP licensing trends (2013 to 2023):</h6>
                  Between 2013 and 2023, there was a varying trend in counts, starting at 93 in 2013
                  and rising to a peak of 178 in 2022. However, 2023 saw a significant decline with
                  a 50.6% drop, registering a count of 88. Notably, the years 2016, 2017, and 2022
                  had the highest counts, highlighting periods of increased activity. It's important
                  to note that the 2023 data might be updated as the year concludes.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* report */}
        <div className="flex flex-col gap-y-1 flex-shrink-0 w-[200px]">
          <Button
            htmlType={"button"}
            type={"primary"}
            rounded={"medium"}
            size={"small"}
            handleClick={() => navigate("/m&a-landscaping/full-report")}
            classname={"text-sm font-semibold border-2 border-primary-900"}
          >
            Generate full report
          </Button>
          <Button
            htmlType={"button"}
            type={"secondary"}
            rounded={"medium"}
            size={"small"}
            classname={"text-sm font-semibold"}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const DateFiltersLists = [
  "Published Date",
  "Filing Date",
  "Earliest Priority Date",
  "Granted Date",
];
const LegalStatus = [
  "Active",
  "Pending",
  "Discontinued",
  "Expired",
  "Inactive",
  "Unknown",
  "Patented",
];
const Types = [
  "Utility",
  "Design",
  "Plant",
  "Software",
  "Biotechnology",
  "Business method",
  "Chemical",
  "Pharmaceutical",
  "Mechanical",
  "Medical device",
];
const ArtGroup = ["2169", "2187", "3662", "3729", "2915", "1793", "3725", "1733", "2823"];
const Classifications = ["WIPO", "USPC", "PCT", "CPC", "IPC/ IPCR"];
const Jurisdiction = [
  "United States",
  "European Union",
  "China",
  "Japan",
  "South Korea",
  "India",
  "Canada",
  "Australia",
  "Brazil",
  "Russia",
];

const Names = [
  "Danet ty M",
  "Hart Justin",
  "Lee Jongryul",
  "Kim Jaedeok",
  "Danet Ty M",
  "Hart Justin",
  "Riabov",
  "Lee Jongryul",
  "Kim Jaedeok",
  "Danet Ty M",
  "Hart Justin",
  "Riabov",
];
const countryLists = ["Nepal", "China", "India"];

const relatedKeywords = [
  "Machine learning",
  "Neural networks",
  "Robotics",
  "Deep learning",
  "Computer vision",
  "Data mining",
];
