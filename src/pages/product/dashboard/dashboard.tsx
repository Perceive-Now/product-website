import { useState } from "react";
import { useLocation } from "react-router-dom";
import TopUniversities from "../../../components/@dashboard/top-universities";

//
import WorldMap from "../../../components/@product/world-map";
import PageTitle from "../../../components/reusable/page-title";

//
import { IKeywordOption } from "../../../components/reusable/search/search";

/**
 *
 */
export default function DashboardPage() {
  const location = useLocation();
  const locationState = location.state as ILocationState;

  const [searchKeywords] = useState(locationState?.search ?? []);

  return (
    <div>
      {searchKeywords && (
        <p>
          <span>Searching for: </span>
          <span>"</span>
          <span className="font-semibold">
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
          </span>
          <span>"</span>
        </p>
      )}

      {/* 2nd row map */}
      <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
        <PageTitle
          info="Hello world"
          titleClass="font-bold"
          title="Geographical Footprint of Publications and Patents"
          children={
            <div className="flex justify-between">
              <p className="text-sm">
                Heat map of publications related to "COVID-19"
              </p>

              <div className="flex"></div>
            </div>
          }
        />

        <div className="grid grid-cols-12 mt-2 h-[610px]">
          <div className="col-span-3 overflow-y-scroll">
            <div style={{ height: 999 }}>
              {/* Scrollable list goes here... need to display items here */}
            </div>
          </div>

          <div className="col-span-9 bg-gray-200">
            <WorldMap
              type="publicationHeatmap"
              markers={[
                { coordinates: [-68.1193, -16.4897] },
                { coordinates: [-74.0721, 4.711] },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 5th row map */}
      <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
        <PageTitle
          info="Hello world"
          titleClass="font-bold"
          title="Geographical Footprint of Competitors"
          children={
            <div className="flex justify-between">
              <p className="text-sm">
                World map with heat spots & icon for top competitors
              </p>

              <div className="flex"></div>
            </div>
          }
        />

        <div className="grid grid-cols-12 mt-2 h-[610px]">
          <div className="col-span-3 overflow-y-scroll">
            <div style={{ height: 999 }}>
              {/* Scrollable list goes here... need to display items here */}
            </div>
          </div>

          <div className="col-span-9 bg-gray-200">
            <WorldMap
              type="basicPublication"
              markers={[
                { coordinates: [-68.1193, -16.4897] },
                { coordinates: [-74.0721, 4.711] },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 7th row map */}
      <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
        <PageTitle
          info="Hello world"
          titleClass="font-bold"
          title="Geographical footprint of experts "
          children={
            <div className="flex justify-between">
              <p className="text-sm">
                Location of experts working on "COVID-19"
              </p>

              <div className="flex"></div>
            </div>
          }
        />

        <div className="grid grid-cols-12 mt-2 h-[610px]">
          <div className="col-span-3 overflow-y-scroll">
            <div style={{ height: 999 }}>
              {/* Scrollable list goes here... need to display items here */}
            </div>
          </div>

          <div className="col-span-9 bg-gray-200">
            <WorldMap
              type="basicPatents"
              markers={[
                { coordinates: [-68.1193, -16.4897] },
                { coordinates: [-74.0721, 4.711] },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 9th row */}
      <div className="mt-4 mb-2">
        <PageTitle
          learnMore="Learn How"
          title="Academic R&D"
          titleClass="font-bold"
        />
      </div>
      <TopUniversities />
    </div>
  );
}

interface ILocationState {
  search?: IKeywordOption[];
}
