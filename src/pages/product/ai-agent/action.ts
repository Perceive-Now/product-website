import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "src/store";
import { formatJsonResponse } from "src/stores/vs-product";

export const sendAiAgentQuery = createAsyncThunk(
    "sendQuery",
    async (
        { agentName, user_input, user_id, thread_id, sendPitchData }: { agentName?: string; user_input: string; user_id: string; thread_id: string, sendPitchData?: boolean },
        { getState },
    ): Promise<any> => {
        console.log("ThreadId", thread_id)
        const state = getState() as RootState;
        const pitchdeckData = state.VSProduct.pitchdeck_data;

        const bodyData = {
            userId: String(user_id), // Convert userId to string
            threadId: thread_id,
            industry: "AI",
            agent: agentName || "Startup Diligence Agent",
            useCase: "AI",
            step: 0,
            data: { user_input: sendPitchData ? JSON.stringify(pitchdeckData) : user_input },
        }
        const response: any = await axios.post(
            "https://templateuserrequirements.azurewebsites.net/process-step",
            bodyData,
            { headers: { "Content-Type": "application/json" }, responseType: "stream" }

        );
        if (sendPitchData) {
            return response

        }
        else {
            return response
        }

        return;
    },
);