import { createSlice } from "@reduxjs/toolkit";
import { IAddOnInfo } from "../components/@signup-complete/@choosePlan/AddOn";

const initialState: ISubscriptionInitialState = {
  selectedAddOns: [],
  baseProduct: {},
};
/**
 *
 */
export const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSelectedAddOns: (state, action) => {
      state.selectedAddOns = action.payload;
    },
    setBaseProduct: (state, action) => {
      state.baseProduct = action.payload;
    },
  },
});

export const { setSelectedAddOns, setBaseProduct } = SubscriptionSlice.actions;
export default SubscriptionSlice.reducer;

interface ISubscriptionInitialState {
  selectedAddOns: IAddOnInfo[];
  baseProduct: IAddOnInfo;
}
