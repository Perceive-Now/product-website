import UseCaseSelectButton from "../../../components/reusable/usecase-select";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import SelectedReport from "./selected-report";

interface Props {
  UseCaseOptions: any[];
  selected: any;
  handleChange: any;
  reports: any;
  onContinue: () => void;
  isUploading?: boolean;
}

const Tabs = [
  {
    label: "IP Analysis",
  },
  {
    label: "Market Research",
  },
];

const UseCaseTab = ({
  UseCaseOptions,
  selected,
  handleChange,
  reports,
  onContinue,
  isUploading = false,
}: Props) => {
  return (
    <div className="w-full">
      <Tab.Group as={"div"} className="w-full">
        <Tab.List className={"flex items-center w-full"}>
          {Tabs.map((tab, idx) => (
            <Tab
              key={tab.label}
              className={({ selected }) =>
                classNames(
                  "w-[250px] py-0.5 text-base",
                  idx === 0 && "rounded-l-md",
                  idx === 1 && "rounded-r-md",
                  selected ? "bg-primary-900 text-white" : "bg-appGray-100 text-secondary-800",
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>
        <div className="flex justify-between mt-4">
          <Tab.Panels>
            <Tab.Panel>
              <div className="items-center w-[300px]">
                <div className="space-y-[20px]">
                  <div className="space-y-[10px]">
                    <p className="text-primary-900 font-600">Pro reports</p>
                    <UseCaseSelectButton
                      options={UseCaseOptions.filter(
                        (r) => r.reportPlan === "pro" && r.reportType === "ip",
                      )}
                      activeModes={selected}
                      handleModeChange={handleChange}
                      classNames={{
                        component: "flex flex-col gap-[10px]",
                      }}
                    />
                  </div>
                  <div className="space-y-[10px]">
                    <p className="text-primary-900 font-600">Premium reports</p>
                    <UseCaseSelectButton
                      options={UseCaseOptions.filter(
                        (r) => r.reportType === "ip" && r.reportPlan === "premium",
                      )}
                      activeModes={selected}
                      handleModeChange={handleChange}
                      classNames={{
                        component: "flex flex-col gap-[10px]",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="items-center w-[300px]">
                <div className="space-y-[20px]">
                  <div className="space-y-[10px]">
                    <p className="text-primary-900 font-600">Pro reports</p>
                    <UseCaseSelectButton
                      options={UseCaseOptions.filter(
                        (r) => r.reportPlan === "pro" && r.reportType === "market-research",
                      )}
                      activeModes={selected}
                      handleModeChange={handleChange}
                      classNames={{
                        component: "flex flex-col gap-[10px]",
                      }}
                    />
                  </div>
                  <div className="space-y-[10px]">
                    <p className="text-primary-900 font-600">Premium reports</p>
                    <UseCaseSelectButton
                      options={UseCaseOptions.filter(
                        (r) => r.reportType === "market-research" && r.reportPlan === "premium",
                      )}
                      activeModes={selected}
                      handleModeChange={handleChange}
                      classNames={{
                        component: "flex flex-col gap-[10px]",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
          <div className="w-[300px] 2xl:w-[350px]">
            <SelectedReport reports={reports} onContinue={onContinue} isUploading={isUploading} />
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default UseCaseTab;
