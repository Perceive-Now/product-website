const ReportSlider = ({ value, setValue }: any) => {
  // const [value, setValue] = useState(50); // Initial value

  const handleChange = (event: any) => {
    setValue(event.target.value); // Update the value state when slider value changes
  };
  return (
    <div className="relative mb-6 w-full">
      <input
        type="range"
        value={value}
        min={5}
        max={40}
        onChange={handleChange}
        className="slider w-full h-1 bg-primary-900 rounded-lg appearance-none cursor-pointer "
      />
      <div className="text-sm font-700 font-helvetica  absolute left-[2%] -bottom-[22px] font-bold">
        <div className="bg-secondary-500 h-[24px] w-[4px] rounded-full" />
        <span className="">5</span>
      </div>
      <div className="text-sm text-black font-700 font-helvetica absolute left-[45%] -translate-x-1/2 rtl:translate-x-1/2 -bottom-[22px] font-bold">
        <div className="bg-secondary-500 h-[24px] w-[4px] rounded-full" />
        20
      </div>
      <div className="text-sm text-black font-700 font-helvetica absolute end-0 left-[92%] -bottom-[22px] font-bold">
        <div className="bg-secondary-500 h-[24px] w-[4px] rounded-full" />
        40
      </div>
    </div>
  );
};

export default ReportSlider;
