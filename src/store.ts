import { configureStore } from "@reduxjs/toolkit";

//
import AuthReducer from "./stores/auth";
import globalSearch from "./stores/global-search";

//
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    globalSearch: globalSearch
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
