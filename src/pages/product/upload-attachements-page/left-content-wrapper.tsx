function LeftContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-between gap-x-[40px]  2xl:gap-x-[150px]">{children}</div>
  );
}

export default LeftContentWrapper;
