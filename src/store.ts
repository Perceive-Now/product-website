import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import DashboardReducer from "./stores/dashboard";
import SubscriptionReducer from "./stores/subscription";
import DateSlice from "./stores/date";
import IPStepSlice from "./stores/IpSteps";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    dashboard: DashboardReducer,
    subscription: SubscriptionReducer,
    date: DateSlice,
    ipData: IPStepSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
