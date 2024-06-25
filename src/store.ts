import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import DashboardReducer from "./stores/dashboard";
import StatesSlice from "./stores/US-states";
import UseCaseSlice from "./stores/use-case";
import SessionSlice from "./stores/session";
import ChatSlice from "./stores/chat";
import Knownow from "./stores/know-now";
import KnownowSlice1 from "./stores/know-now1";
import UploadAttachmentsSlice from "./stores/upload-attachments";
import uploadQuickPrompt from "./stores/upload-quick-prompt";
import draftSlice from "./stores/draft";
import QuestionAnswerSlice from "./stores/Q&A";

//
import KnownowIPSlice from "./stores/knownow-ip";
import KnownowMarketSlice from "./stores/knownow-market";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    states: StatesSlice,
    chat: ChatSlice,
    usecases: UseCaseSlice,
    sessionDetail: SessionSlice,
    KnowNow: Knownow,
    KnowNowIP: KnownowIPSlice,
    KnownowMarket: KnownowMarketSlice,
    KnowNowChat: KnownowSlice1,
    uploadAttachments: UploadAttachmentsSlice,
    uploadQuickPrompt: uploadQuickPrompt,
    draft: draftSlice,
    QA: QuestionAnswerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
