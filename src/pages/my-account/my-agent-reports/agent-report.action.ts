export const fetchAgentReports = async (
  userId: string,
  callback: (value: { reports: any[]; loading: boolean }) => void,
) => {
  try {
    const response = await fetch(
      `https://templateuserrequirements.azurewebsites.net/threads/${userId}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );

    if (response.ok) {
      const data = await response.json();
      callback({
        reports: data || [],
        loading: false,
      });
    }
  } catch (err) {
    console.error(err);
    callback({
      reports: [],
      loading: false,
    });
  } finally {
    // setLoading(false);
  }
};

export const fetchAgentThreadDetails = async (
  thread_id: string,
  userId: string,
  callback: (value: { reports: any; loading: boolean }) => void,
) => {
  try {
    const response = await fetch(
      `https://templateuserrequirements.azurewebsites.net/threads/${thread_id}/${userId}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );

    if (response.ok) {
      const data = await response.json();
      callback({
        reports: data || {},
        loading: false,
      });
    }
  } catch (err) {
    console.error(err);
    callback({
      reports: {},
      loading: false,
    });
  } finally {
    // setLoading(false);
  }
};
