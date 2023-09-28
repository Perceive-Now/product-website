import { FunctionComponent } from "react";

interface Props {
  dataList: DataList[];
}

interface DataList {
  description: string;
  name: string;
  date: string;
  address: string;
}

const CommonList: FunctionComponent<Props> = ({ dataList }) => {
  return (
    <div className="space-y-2 h-[400px] overflow-y-auto custom-scroller">
      {dataList.map((list, idx) => (
        <div key={idx} className=" p-1 bg-appGray-100 rounded-lg text-secondary-800">
          <p className="text-lg text-secondary-800 font-medium">{list.description}</p>
          <p className="text-base text-secondary-800 py-1">{list.name}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_452_8284)">
                    <path
                      d="M8.00016 1.3335C5.42016 1.3335 3.3335 3.42016 3.3335 6.00016C3.3335 7.16016 3.66683 8.24683 4.2735 9.22683C4.90683 10.2535 5.74016 11.1335 6.38016 12.1602C6.6935 12.6602 6.92016 13.1268 7.16016 13.6668C7.3335 14.0335 7.4735 14.6668 8.00016 14.6668C8.52683 14.6668 8.66683 14.0335 8.8335 13.6668C9.08016 13.1268 9.30016 12.6602 9.6135 12.1602C10.2535 11.1402 11.0868 10.2602 11.7202 9.22683C12.3335 8.24683 12.6668 7.16016 12.6668 6.00016C12.6668 3.42016 10.5802 1.3335 8.00016 1.3335ZM8.00016 7.8335C7.08016 7.8335 6.3335 7.08683 6.3335 6.16683C6.3335 5.24683 7.08016 4.50016 8.00016 4.50016C8.92016 4.50016 9.66683 5.24683 9.66683 6.16683C9.66683 7.08683 8.92016 7.8335 8.00016 7.8335Z"
                      fill="#323232"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_452_8284">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className="text-base ">{list.address}</span>
            </div>
            <span>{list.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonList;
