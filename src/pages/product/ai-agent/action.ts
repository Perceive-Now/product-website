import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "src/store";
import { formatJsonResponse } from "src/stores/vs-product";

export const sendAiAgentQuery = createAsyncThunk(
  "sendQuery",
  async (
    {
      agentName,
      user_input,
      user_id,
      thread_id,
      sendPitchData,
      file_upload_status,
    }: {
      agentName?: string;
      user_input: string;
      user_id: string;
      thread_id: string;
      sendPitchData?: boolean;
      file_upload_status?: boolean;
    },
    { getState },
  ): Promise<any> => {
    console.log("ThreadId", thread_id);
    const state = getState() as RootState;
    const pitchdeckData = state.VSProduct.pitchdeck_data;

    const bodyData = {
      userId: String(user_id), // Convert userId to string
      threadId: String(thread_id),
      industry: "AI",
      agent: agentName || "Startup Diligence Agent",
      useCase: "AI",
      step: 0,
      data: { user_input: sendPitchData ? JSON.stringify(pitchdeckData) : user_input },
      file_upload_status: file_upload_status ? file_upload_status : false,
    };
    const response: any = await axios.post(
      "https://templateuserrequirements.azurewebsites.net/process-step",
      bodyData,
      { headers: { "Content-Type": "application/json" }, responseType: "stream" },
    );
    if (sendPitchData) {
      return response;
    } else {
      return response;
    }

    return;
  },
);

export const endChatThread = createAsyncThunk(
  "chatEnded",
  async (
    {
      user_id,
      thread_id,
    }: {
      user_id: string;
      thread_id: string;
    },
    { getState },
  ): Promise<any> => {
    const response: any = await axios.patch(
      `https://templateuserrequirements.azurewebsites.net/update_thread_complete/?user_id=${user_id}&thread_id=${thread_id}`,
      {},
      { headers: { "Content-Type": "application/json" }, responseType: "stream" },
    );
  },
);

export const submitCustomizeReport = createAsyncThunk(
  "submitCustomizeReport",
  async (payload: any, { getState }): Promise<any> => {
    const response: any = await axios.post(
      `https://templateuserrequirements.azurewebsites.net/api/threads/report-config`,
      payload,
      { headers: { "Content-Type": "application/json" }, responseType: "stream" },
    );
    return response;
  },
);

export const fetchCustomizeReport = async (
  thread_id: string,
  userId: string,
  callback: (value: { customReport: any; loading: boolean }) => void,
) => {
  try {
    const response = await fetch(
      `https://templateuserrequirements.azurewebsites.net/api/threads/${thread_id}/report-config?user_id=${userId}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );

    if (response.ok) {
      const data = await response.json();
      callback({
        customReport: data || {},
        loading: false,
      });
    }
  } catch (err) {
    console.error(err);
    callback({
      customReport: {},
      loading: false,
    });
  } finally {
    // setLoading(false);
  }
};
