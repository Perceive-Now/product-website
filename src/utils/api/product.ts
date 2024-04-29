import axiosInstance from "../axios";

const authCode = process.env.REACT_APP_AUTH_CODE;

export async function getProducts() {
  const response = await axiosInstance.get<IProductResponse>(
    `/api/get_products?code=${authCode}&clientId=default`,
  );

  return response.data.products;
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
