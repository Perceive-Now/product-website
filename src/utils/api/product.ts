import { AppConfig } from "src/config/app.config";
import axiosInstance from "../axios";

const authCode = AppConfig.Auth_CODE;

export async function getProducts() {
  const response = await axiosInstance.get<IProductResponse>(
    `/api/get_products?code=${authCode}&clientId=default`,
  );

  return response.data.products;
}

export async function getBillingHistory() {
  const response = await axiosInstance.get<IPaymentResponse>(
    `/api/get_payments?code=${authCode}&clientId=default`,
  );

  return response.data.status;
}

// export const createPitchDeckSummary = (slides: { slide: number; text: string[] }[]): string => {
//   const summary = slides
//     .flatMap(slide => slide.text.map(text => text.replace(/\n/g, ' ')))
//     .join(" ");

//   return `Here is my pitch deck: ${summary}`;
// };

export const createPitchDeckSummary = (slides: { slide: number; text: string[] }[]): string => {
  const summary = slides
    .map(slide => 
      slide.text
        .map(text => text.replace(/"/g, '').replace(/\n/g, ',')) // Remove quotation marks and replace newlines with commas
        .join(" ") // Join the cleaned text of each slide
    )
    .join(" "); // Join all slides' texts into one string

  return `Here is my pitch deck: ${summary}`;
};


interface IPaymentResponse {
  status: IPayment[];
}

interface IPayment {
  id: number;
  status: string;
  final_payment_info: {
    amount: number;
    currency: string;
  };
  user_id: number;
  created_at: string;
  updated_at: string;
}

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

export interface IProducts {
  id: number;
  label: string;
  value: string;
  desc: string;
  reportType: string;
  reportPlan: string;
}
