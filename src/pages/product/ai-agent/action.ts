import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "src/store";
import { formatJsonResponse } from "src/stores/vs-product";

export const sendAiAgentQuery = createAsyncThunk(
    "sendQuery",
    async (
        { user_input, user_id, thread_id, sendPitchData }: { user_input: string; user_id: string; thread_id: string, sendPitchData?: boolean },
        { getState },
    ): Promise<any> => {
        const state = getState() as RootState;
        const pitchdeckData = state.VSProduct.pitchdeck_data;

        const bodyData = {
            userId: String(user_id), // Convert userId to string
            threadId: thread_id,
            industry: "AI",
            agent: "Startup Diligence Agent",
            useCase: "AI",
            step: 0,
            data: { user_input: sendPitchData ? pitchdeckData : user_input },
        }
        const response: any = await axios.post(
            "https://templateuserrequirements.azurewebsites.net/process-step",
            bodyData

        );
        if (sendPitchData) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const { value } = await reader.read();
            if (value) {
                const chunk = decoder.decode(value);
                console.log("chunk", chunk);
                console.log("type of chunk", typeof chunk);

                let answer = JSON.parse(chunk);
                answer = answer.replace(/```/g, "");
                answer = answer.replace(/}\s*{/g, "}{");
                console.log("answer", typeof answer, answer);
                // const newanswer = JSON.parse(answer);

                const newanswer = formatJsonResponse(answer);

                if (newanswer.Step == 4) {
                    const jsonParts = answer.split("}{");
                    const secondJsonString = jsonParts[1].startsWith("{") ? jsonParts[1] : `{${jsonParts[1]}`;
                    if (secondJsonString) {
                        const dataObject = JSON.parse(secondJsonString);
                        newanswer.DataSources = dataObject;
                        console.log("dataObject", dataObject);
                    } else return;
                }


                return newanswer;
            }
        }
        else {
            return response
        }

        return;
    },
);