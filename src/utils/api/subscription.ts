import axiosInstance from "../axios";

/**
 *
 */
export async function getProductsAndModules() {
  const response = await axiosInstance.get<IProductModulesResponse>(
    `/api/v1/product/product-module-list/`,
  );
  return response.data;
}

interface IProductPrice {
  pkid: string;
  order_id: number;
  product_name: string;
  duration: "MONTH" | "YEAR";
  price: string;
}

interface IModulePrice {
  pkid: string;
  order_id: number;
  module_name: string;
  duration: "MONTH" | "YEAR";
  price: string;
}

interface IModule {
  pkid: string;
  order_id: number;
  module_name: string;
  is_addon: boolean;
  module_price?: IModulePrice[];
}

interface IProduct {
  pkid: string;
  order_id: number;
  product_name: string;
  module: IModule[];
  product_price: IProductPrice[];
}

interface IProductModulesResponse {
  products: IProduct[];
  modules: IModule[];
}

interface ISubscriptionPaymentResponse {
  data: ISubscriptionPayment;
}

export interface ISubscriptionPayment {
  checkout_session_id: string;
  stripe_pub_key: string;
}
/**
 *
 */
export async function handleSubscriptionPayment({ body }: ISubscriptionPaymentProps) {
  const response = await axiosInstance.post<ISubscriptionPaymentResponse>(
    `/api/v1/payment/subscription/payment-method/`,
    body,
  );
  return response.data;
}

interface ISubscriptionPaymentProps {
  body: ISubscriptionBody;
}

export interface ISubscriptionBody {
  duration: "MONTH" | "YEAR";
  is_trial: boolean;
  product: {
    price: string;
  };
  addons: {
    price: string;
  }[];
}
