import KeyDetail from "../../../../../components/@dashboard/IP-landscaping/key-detail";
import Keytakeaway from "../../../../../components/reusable/keytakeaways";
import { leadingIPCClass } from "./key";

interface IPCData {
  ipc_class: string;
  count: number;
}

interface Props {
  data: IPCData[];
}

const IPCKeyTakeaway = ({ data }: Props) => {
  return (
    <>
      <KeyDetail section="Key Takeaway">
        <Keytakeaway title={"Leading IPC Class"} description={leadingIPCClass(data) || "N/A"} />
        <Keytakeaway
          title={"Growth Trend in IPC Class Applications"}
          description={"N/A"}

          // }
        />
        <Keytakeaway title={"Comparison of IPC Class Dominance"} description={"N/A"} />
        <Keytakeaway title={"Year with Most Diverse IPC Class Filings"} description={"N/A"} />
      </KeyDetail>
    </>
  );
};

export default IPCKeyTakeaway;
