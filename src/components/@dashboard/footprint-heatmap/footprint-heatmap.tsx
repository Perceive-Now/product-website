import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Combobox, Transition } from "@headlessui/react";

//
import USMap from "../../@product/us-map";
import WorldMap from "../../@product/world-map";
import { IWorldMapDataItem } from "../../@product/world-map/world-map";

import PageTitle from "../../reusable/page-title";

//
import countryNames from "../../../utils/extra/country-2-names";
import countryISOMapping from "../../../utils/extra/country-codes";
import { getPublicationsAndPatentsMap } from "../../../utils/api/map";
import { ChevronDown } from "../../icons";
import classNames from "classnames";

/**
 *
 */
export default function FootprintHeatmap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] =
    useState<availableModes>("publicationHeatmap");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [query, setQuery] = useState("");

  //
  const joinedKeywords = props.keywords.map((kwd) => `"${kwd}"`).join(", ");

  //
  const { data, isLoading } = useQuery(
    ["footprint-for-patents-and-publications", ...props.keywords],
    async () => {
      return await getPublicationsAndPatentsMap(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const formattedData: IWorldMapDataItem[] = Object.entries(
    data?.publications.sortedCount ?? {}
  ).map(([key, value]) => ({
    country: countryISOMapping[key],
    publications: value,
  }));

  const finalData = isLoading ? [] : formattedData;

  //
  const pubCountryList = data?.publications.Country_wise_titles ?? [];

  const filteredCountryList = pubCountryList.filter((itm) =>
    countryNames[itm.Country]?.toLowerCase()?.includes(query?.toLowerCase())
  );

  const patentsListForCountry = (
    data?.publications.Country_wise_titles.find(
      (itm) => itm.Country === selectedCountry
    )?.Paper_titles ?? []
  )?.slice(0, 10);

  //
  useEffect(() => {
    setQuery("");
    setSelectedCountry("");
  }, [props.keywords]);

  //
  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
        titleClass="font-bold"
        title="Geographical Footprint of Publications and Patents"
        children={
          <div className="flex justify-between">
            <p className="text-sm">
              <span>Heat map of publications and patents</span>
            </p>

            <div className="flex gap-x-3 text-sm">
              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="publicationHeatmap"
                  name="currentModeHeatmap"
                  checked={currentMode === "publicationHeatmap"}
                  onChange={() => setCurrentMode("publicationHeatmap")}
                />
                <label htmlFor="publicationHeatmap" className="cursor-pointer">
                  Publications
                </label>
              </div>

              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="patentsHeatmap"
                  name="currentModeHeatmap"
                  checked={currentMode === "patentsHeatmap"}
                  onChange={() => setCurrentMode("patentsHeatmap")}
                />
                <label htmlFor="patentsHeatmap" className="cursor-pointer">
                  Patents
                </label>
              </div>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 overflow-y-scroll pr-2">
          {currentMode === "publicationHeatmap" && (
            <>
              <div>
                <Combobox value={selectedCountry} onChange={setSelectedCountry}>
                  <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border border-gray-300">
                      <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(country: any) => countryNames[country]}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Select a country"
                      />

                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-1">
                        <ChevronDown
                          className="h-3 w-3 text-gray-500"
                          aria-hidden="true"
                        />
                      </Combobox.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-300">
                        {pubCountryList.length === 0 ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredCountryList.map((country) => (
                            <Combobox.Option
                              key={country.Country}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-2 ${
                                  active
                                    ? "bg-primary-100 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={country.Country}
                            >
                              {({ selected }) => (
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "font-semibold text-primary-600"
                                      : "font-normal"
                                  }`}
                                >
                                  {countryNames[country.Country]}
                                </span>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div>
                {patentsListForCountry?.map((itm, index) => (
                  <div
                    key={index}
                    className={classNames("mt-3", {
                      "pb-3 border-b border-gray-300":
                        index !== patentsListForCountry.length - 1,
                    })}
                  >
                    <span>{itm}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-span-9 bg-gray-200">
          {currentMode === "publicationHeatmap" ? (
            <WorldMap type={currentMode} data={finalData} />
          ) : (
            <USMap type="heatmap" data={[]} />
          )}
        </div>
      </div>
    </div>
  );
}

type availableModes = "publicationHeatmap" | "patentsHeatmap";

interface IFootprintHeatmapProps {
  keywords: string[];
}
