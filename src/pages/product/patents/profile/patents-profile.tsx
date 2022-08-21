import { useState } from "react";

//
import PageTitle from "../../../../components/reusable/page-title";

/**
 *
 */
export default function PatentsProfile() {
  const [patentsProfileData] = useState<IPatentsProfileData>({
    title: "Personal protective equipment and methods",
    publicationPatentNumber: "0005",
    description: `Personal protective equipment (PPE) such as e.g., 
    face masks, face shields, etc. are widely used to, inter alia, prevent the spread of
     germs and/or exposure to toxic substances. Further, PPE are used to prevent contamination of sensitive equipment and/or materials from particulate matter sloughed from human bodies and clothing. Thus,
      in healthcare settings, PPE may be worn by surgeons, doctors, nurses, anesthesiologists, technicians, assistants, and other persons permitted into an operating room or other healthcare facility. Additionally, they may be worn during general examinations especially of contagious or potentially contagious persons or animals (e.g., Avian Flu, Ebola virus) and/or immunodeficient persons or animals. Further, persons tasked with environmental clean-up and inspection may wear PPE to protect against environmental exposure to infectious and/or toxic substances. Furthermore, personnel working in clean room settings may be required 
    to wear PPE to protect sensitive equipment and materials from contamination 
    due to particulate matter (e.g., dead skin cells, hair, clothing particles, etc.).
     Further still, in recent years, worldwide outbreaks of certain serious and highly contagious diseases have prompted individuals to wear PPE masks in daily life (i.e., outside of hospitals and medical treatment facilities). Moreover, individuals in highly air-polluted regions (such as portions of Japan and China) routinely wear a mask in an attempt to filter out harmful airborne substances, or even for some level of protection against ingestion
      or inhalation of biological agents such as allergens.`,
    type: "CPCI",
    filed: "2021-10-08",
    publicationDate: "2021-10-08",
    applicant: "Micheal J. O'Leary",
    assignee: "3M Innovative Properties Company",
    inventors: "Micheal J. O'Leary",
    ipc: "A 41 D 31/102",
    location: "Del Mar, CA, United States",
  });
  
  return (
    <div className="max-w-[870px] text-appGray-900">
      <PageTitle title={patentsProfileData.title} />
      <div className="pt-8 pb-4">
        <span className="pr-4 font-bold">Publication/Patent number:</span>
        <span>[{patentsProfileData.publicationPatentNumber}]</span>
      </div>
      <div className="pb-4">{patentsProfileData.description}</div>
      <div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Type:</span>
          <span>{patentsProfileData.type}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Filed:</span>
          <span>{patentsProfileData.filed}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Publication date:</span>
          <span>{patentsProfileData.publicationDate}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Applicant:</span>
          <span>{patentsProfileData.applicant}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Assignee:</span>
          <span>{patentsProfileData.assignee}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Inventor(s):</span>
          <span>{patentsProfileData.inventors}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">IPC:</span>
          <span>{patentsProfileData.ipc}</span>
        </div>
        <div className="pb-4">
          <span className="font-bold pr-4 ">Location:</span>
          <span>{patentsProfileData.location}</span>
        </div>
      </div>
    </div>
  );
}

interface IPatentsProfileData {
  title: string;
  publicationPatentNumber: string;
  description: string;
  type: string;
  filed: string;
  publicationDate: string;
  applicant: string;
  assignee: string;
  inventors: string;
  ipc: string;
  location: string;
}
