interface IPatentsProfileData {
    title: string;
    publicationPatentNumber: string;
    description: string;
    patentInfo: TPatentInfoType[];
}

type TPatentInfoType = {
    title: string;
    value: string;
}


export const patentsProfileData: IPatentsProfileData = {
    title: "Personal protective equipment and methods",
    publicationPatentNumber: '0005',
    description: `Personal protective equipment (PPE) such as e.g., 
    face masks, face shields, etc. are widely used to, inter alia, prevent the spread of
     germs and/or exposure to toxic substances. Further, PPE are used to prevent contamination of sensitive equipment and/or materials from particulate matter sloughed from human bodies and clothing. Thus,
      in healthcare settings, PPE may be worn by surgeons, doctors, nurses, anesthesiologists, technicians, assistants, and other persons permitted into an operating room or other healthcare facility. Additionally, they may be worn during general examinations especially of contagious or potentially contagious persons or animals (e.g., Avian Flu, Ebola virus) and/or immunodeficient persons or animals. Further, persons tasked with environmental clean-up and inspection may wear PPE to protect against environmental exposure to infectious and/or toxic substances. Furthermore, personnel working in clean room settings may be required 
    to wear PPE to protect sensitive equipment and materials from contamination 
    due to particulate matter (e.g., dead skin cells, hair, clothing particles, etc.).
     Further still, in recent years, worldwide outbreaks of certain serious and highly contagious diseases have prompted individuals to wear PPE masks in daily life (i.e., outside of hospitals and medical treatment facilities). Moreover, individuals in highly air-polluted regions (such as portions of Japan and China) routinely wear a mask in an attempt to filter out harmful airborne substances, or even for some level of protection against ingestion
      or inhalation of biological agents such as allergens.`,
    patentInfo: [
        {
            title: "Type",
            value: "CPCI"
        },
        {
            title: "Filed",
            value: '2021-10-08'
        },
        {
            title: 'Publication date',
            value: '2021-10-08'
        },
        {
            title: "Applicant",
            value: "Micheal J. O'Leary"
        },
        { title: 'Assignee', value: '3M Innovative Properties Company' },
        { title: 'Inventor(s)', value: "Micheal J. O'Leary" },
        { title: 'IPC', value: 'A 41 D 31/102' },
        { title: 'Location:', value: 'Del Mar, CA, United States' },
    ]
} 