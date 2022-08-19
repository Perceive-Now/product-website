import PageTitle from "../../../../components/reusable/page-title";
import { patentsProfileData } from "./_data";

function PatentsProfile() {
  return (
    <div className="max-w-[870px] text-appGray-900">
      <PageTitle title={patentsProfileData.title} />
      <div className="pt-8 pb-4">
        <span className="pr-4 font-bold">Publication/Patent number:</span>
        <span>[{patentsProfileData.publicationPatentNumber}]</span>
      </div>
      <div className="pb-4">{patentsProfileData.description}</div>
      <div>
        {patentsProfileData.patentInfo.map((info, idx) => {
          return (
            <div key={idx} className="pb-4">
              <span className="font-bold pr-4 ">{info.title}:</span>
              <span>{info.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatentsProfile;
