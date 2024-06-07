import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import DashboardReducer from "./stores/dashboard";
import StatesSlice from "./stores/US-states";
import UseCaseSlice from "./stores/use-case";
import SessionSlice from "./stores/session";
import ChatSlice from "./stores/chat";
import UISlice from "./stores/UI";
import KnownowSlice from "./stores/know-now";
import KnownowSlice1 from "./stores/know-now1";
import UploadAttachmentsSlice from "./stores/upload-attachments";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    states: StatesSlice,
    chat: ChatSlice,
    usecase: UseCaseSlice,
    sessionDetail: SessionSlice,
    UI: UISlice,
    KnowNow: KnownowSlice,
    KnowNowChat: KnownowSlice1,
    uploadAttachments: UploadAttachmentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
