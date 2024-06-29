function LeftContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-between gap-x-[50px] lg:gap-x-[100px] xl:gap-x-[150px]">
      {children}
    </div>
  );
}

export default LeftContentWrapper;
