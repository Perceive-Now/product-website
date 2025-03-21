import axios from "axios";
import { API_PROD_URL } from "../axios";

export async function getMadlib(user_id: string, requirement_gathering_id: string) {
  const response = await axios.get(
    `${API_PROD_URL}/get-items?userId=${user_id}&requirementId=${requirement_gathering_id}
`,
    // `${BASE_PN_REPORT_URL}/get-answers/?userID=${user_id}&requirement_gathering_id=${requirement_gathering_id}`,
  );

  return response.data?.items;
}
