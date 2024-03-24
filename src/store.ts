import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import DashboardReducer from "./stores/dashboard";
import SubscriptionReducer from "./stores/subscription";
import DateSlice from "./stores/date";
import IPStepSlice from "./stores/IpSteps";
import StatesSlice from "./stores/US-states";
import ChatSlice from "./stores/chat";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    subscription: SubscriptionReducer,
    date: DateSlice,
    ipData: IPStepSlice,
    states: StatesSlice,
    chat: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
