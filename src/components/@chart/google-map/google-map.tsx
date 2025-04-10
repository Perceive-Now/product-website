import { useState, memo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader, InfoBox } from "@react-google-maps/api";

//
import { BriefcaseIcon, LocationIcon } from "../../icons";

//
import { IWorldMapDataItem, TooltipGroupItem } from "../world-map/world-map";

//
import { AppConfig } from "src/config/app.config";

//
const GOOGLE_API_KEY = AppConfig.GOOGLE_API_KEY;

//
const WORLD_CENTER = {
  lat: 13.745,
  lng: 8.523,
};

const US_CENTER = {
  lat: 37.8283,
  lng: -97.5795,
};

const WORLD_ZOOM = 2;
const US_ZOOM = 4.2;

//
const mapStyle = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "landscape.man_made",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road.arterial",
    stylers: [{ visibility: "on" }],
  },
];

//

//
function GoogleMaps(props: IGoogleMapProps) {
  const [activeMarkerData, setActiveMarkerData] = useState<IWorldMapDataItem | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  //
  return (
    <div className="w-full h-full relative">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="w-full h-full z-10"
          center={props.isWorldMap ? WORLD_CENTER : US_CENTER}
          zoom={props.isWorldMap ? WORLD_ZOOM : US_ZOOM}
          options={{
            minZoom: 2,
            streetViewControl: false,
            mapTypeControl: false,
            styles: mapStyle,
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180,
              },
            },
          }}
        >
          <>
            {/* Markers */}
            {props.data?.map((marker, index) => (
              <MarkerF
                key={index}
                position={{
                  lat: +(marker.lat ?? 0),
                  lng: +(marker.lng ?? 0),
                }}
                onMouseOver={() => setActiveMarkerData(marker)}
                onMouseOut={() => setActiveMarkerData(null)}
              >
                {activeMarkerData &&
                  activeMarkerData.location === marker.location &&
                  activeMarkerData.name === marker.name && (
                    <InfoBox options={{ closeBoxURL: "" }}>
                      <div className="bg-white text-gray-700 border border-gray-200 opacity-100 p-2 shadow-lg rounded-2xl">
                        <p className="text-lg mb-1">{activeMarkerData?.name ?? "-"}</p>

                        {activeMarkerData?.employment && (
                          <div className="flex gap-x-[4px] items-center mb-[0.25rem]">
                            <BriefcaseIcon className="text-gray-400" />
                            <span>{activeMarkerData?.employment}</span>
                          </div>
                        )}

                        <div className="flex gap-x-[4px] items-center">
                          <LocationIcon className="text-gray-400" />
                          <span>{activeMarkerData?.location ?? "-"}</span>
                        </div>

                        <div className="mt-2 flex gap-x-2">
                          {activeMarkerData.experts && (
                            <TooltipGroupItem title="Experts" value={activeMarkerData.experts} />
                          )}

                          {activeMarkerData.patents && (
                            <TooltipGroupItem title="Patents" value={activeMarkerData.patents} />
                          )}

                          {activeMarkerData.publications && (
                            <TooltipGroupItem
                              title="Publications"
                              value={activeMarkerData.publications}
                            />
                          )}
                        </div>
                      </div>
                    </InfoBox>
                  )}
              </MarkerF>
            ))}
          </>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

interface IGoogleMapProps {
  isWorldMap: boolean;
  data?: IWorldMapDataItem[];
}

export default memo(GoogleMaps);
