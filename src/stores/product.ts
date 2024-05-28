import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { AppConfig } from "../utils/app.config";

const initialState: IProduct = {
  id: 0,
  stripe_product_id: "",
  name: "",
  description: "",
  price: 0,
  prod_type: "",
};

export const getProducts = createAsyncThunk("getUserDetails", async (): Promise<IResponse> => {
  try {
    // TODO:: Make an API call to get user profile
    // After that add user's name and image to the response object
    await axiosInstance.get<IProductResponse>(
      `/api/get_products?code=${AppConfig.Auth_CODE}&clientId=default`,
    );
    return {
      success: true,
      message: "Successfully fetched user details",
      data: {
        // product_id
        //
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to fetch user details",
    };
  }
});

/**
 *
 */
export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setSelectedAddOns: (state, action) => {
    //   state.selectedAddOns = action.payload;
    // },
    // setBaseProduct: (state, action) => {
    //   state.baseProduct = action.payload;
    // },
  },
});

// export const { setSelectedAddOns, setBaseProduct } = ProductSlice.actions;
export default ProductSlice.reducer;

// 5

interface IProductResponse {
  products: IProduct[];
}

export interface IProduct {
  id: number;
  stripe_product_id: string;
  name: string;
  description: string;
  price: number;
  prod_type: string;
}

interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
