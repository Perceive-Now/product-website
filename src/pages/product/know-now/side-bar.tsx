import { Link } from "react-router-dom";

const KnowNowRightSideBar = () => {
  return (
    <div className="border-l">
      <div className="bg-appGray-200 py-1 px-1 rounded-t">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.0535 2.71992L13.3335 7.99992L8.0535 13.2799L7.1135 12.3333L10.7802 8.66658H1.3335V7.33325H10.7802L7.1135 3.66659L8.0535 2.71992ZM13.3335 7.99992V14.6666H14.6668V1.33325H13.3335V7.99992Z"
            fill="#442873"
          />
        </svg>
      </div>
      <div className="p-2.5">
        <p className="text-sm">Based on th current conversation we found following data:</p>
        <div className="flex justify-end items-center">
          <span className="text-sm">Refresh</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.7667 4.23342C11.2733 3.73665 10.6864 3.34246 10.0399 3.07357C9.39347 2.80468 8.70017 2.66642 8.00001 2.66675C5.05334 2.66675 2.67334 5.05342 2.67334 8.00008C2.67334 10.9467 5.05334 13.3334 8.00001 13.3334C10.4867 13.3334 12.56 11.6334 13.1533 9.33342H11.7667C11.4921 10.1131 10.9822 10.7883 10.3076 11.266C9.6329 11.7436 8.82664 12.0001 8.00001 12.0001C5.79334 12.0001 4.00001 10.2067 4.00001 8.00008C4.00001 5.79342 5.79334 4.00008 8.00001 4.00008C9.10667 4.00008 10.0933 4.46008 10.8133 5.18675L8.66667 7.33342H13.3333V2.66675L11.7667 4.23342Z"
              fill="#442873"
            />
          </svg>
        </div>
        <div className="border rounded mt-2">
          <div className="py-1 bg-primary-900 text-white text-center rounded-t text-sm">
            Keywords from conversation
          </div>
          <div className="bg-appGray-100 flex justify-center flex-wrap py-2 gap-2">
            {/* <div className='p-1 rounded-lg text-sm border'>sensor tech</div>
            <div className='p-1 rounded-lg text-sm border'>pressure</div>
            <div className='p-1 rounded-lg text-sm border'>wearable sensor</div> */}
          </div>
        </div>
        <div className="border rounded mt-2">
          <div className="py-1 bg-primary-900 text-white text-center rounded-t text-sm">
            Stats based on keywords
          </div>
          <div className="bg-appGray-100 justify-center grid grid-cols-2 p-2 gap-2">
            {/* <div className='p-1 rounded-lg text-xs border bg-white text-center'>
              260 Patents granted
            </div>
            <div className='p-1 rounded-lg text-xs border text-center bg-white'>108 Inventors found</div>
            <div className='p-1 rounded-lg text-xs border text-center bg-white'>34 Companies working</div>
            <div className='p-1 rounded-lg text-xs border text-center bg-white'>$26 Millions invested</div> */}
          </div>
        </div>
        <p className="text-sm mt-2 mb-1">You can also generate a full report.</p>
        <Link
          to="/"
          className="text-white text-sm bg-primary-900 inline-block px-2 py-1 rounded-lg relative"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default KnowNowRightSideBar;
