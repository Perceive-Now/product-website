import axios from "axios";

export async function getMadlib(user_id: string, requirement_gathering_id: string) {
  const response = await axios.get(
    `https://templateuserrequirements.azurewebsites.net/get-items?userId=${user_id}&requirementId=${requirement_gathering_id}
`,
    // `${BASE_PN_REPORT_URL}/get-answers/?userID=${user_id}&requirement_gathering_id=${requirement_gathering_id}`,
  );

  return response.data?.items;
}
