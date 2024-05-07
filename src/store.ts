import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import DashboardReducer from "./stores/dashboard";
import SubscriptionReducer from "./stores/subscription";
import DateSlice from "./stores/date";
import StatesSlice from "./stores/US-states";
import UseCaseSlice from "./stores/use-case";
import SessionSlice from "./stores/session";
import ChatSlice from "./stores/chat";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    subscription: SubscriptionReducer,
    date: DateSlice,
    states: StatesSlice,
    chat: ChatSlice,
    usecase: UseCaseSlice,
    sessionDetail: SessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
