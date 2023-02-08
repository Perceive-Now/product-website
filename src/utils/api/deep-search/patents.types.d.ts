interface IDeepSearchPatentDetailInventor {
  name: string;
  id: string;
}

interface IDeepSearchPatentDetailAttorney {
  attorney_organization: string;
  id: string;
}

interface IDeepSearchPatentDetailExamier {
  first_name: string;
  last_name: string;
  examiner_role: string;
  art_group: string;
}

interface IDeepSearchPatentDetailForeignCitation {
  country: string;
  citation_date: string;
  citation_category: string;
  citation_application_id: string;
  citation_sequence: string;
}

interface IDeepSearchItemDetailCPC {
  class: string;
  class_title: string;
  subclass: string;
  subclass_title: string;
  group: string;
  group_title: string;
  cpc_sequence: string;
  cpc_section: string;
  cpc_type: string;
  cpc_symbol_position: string;
}

interface IDeepSearchItemDetailAssignee {
  assignee_organization: string;
  assignee_id: string;
  location_id: string;
  assignee_type: string;
  assignee_location_id: string;
  disambig_city: string;
  disambig_state: string;
  disambig_country: string;
  latitude: string;
  longitude: string;
}

interface IDeepSearchItemDetailApplicant {
  applicant_sequence: string;
  raw_applicant_organization: string;
  applicant_type: string;
  applicant_designation: string;
  applicant_location_id: string;
  city: string;
  state: string;
  country: string;
}

interface IDeepSearchItemDetailTrainee {
  assignee_organization: string;
  assignee_id: string;
  location_id: string;
  assignee_type: string;
  assignee_location_id: string;
  disambig_city: string;
  disambig_state: string;
  disambig_country: string;
  latitude: string;
  longitude: string;
}

interface IDeepSearchItemDetailWipo {
  wipo_field_sequence: string;
  wipo_field_id: string;
  wipo_sector_title: string;
  wipo_field_title: string;
}

interface IDeepSearchItemDetailUsPatentCitation {
  citation_sequence: string;
  citation_patent_id: string;
  citation_date: string;
  citation_category: string;
  wipo_kind: string;
  record_name: string;
}

/**
 *
 */
interface IDeepSearchPatentDetailItem {
  id: string;
  title: string;
  date: string;
  company: string;
  org_type: string;
  abstract: string;
  type: string;
  wipo_kind: string;
  num_claims: number;
  withdrawn: number;
  inventor: IDeepSearchPatentDetailInventor[];
  attorney: IDeepSearchPatentDetailAttorney[];
  examiner: IDeepSearchPatentDetailExamier[];
  foreign_citation: IDeepSearchPatentDetailForeignCitation[];
  cpc: IDeepSearchItemDetailCPC[];
  assignee: IDeepSearchItemDetailAssignee[];
  applicant: IDeepSearchItemDetailApplicant[];
  wipo: IDeepSearchItemDetailWipo[];
  pct: [];
  us_patent_citation: IDeepSearchItemDetailUsPatentCitation[];
}

interface IDeepSearchPatentListItem {
  title: string;
  date: string;
  abstract: string;
  company: string;
  inventor: string;
  _id: string;
}
