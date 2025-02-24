import { ProductType } from "../api/products/route";
import useSWR from "swr";

const fetcher = async (url: string): Promise<ProductType[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  const data = await response.json();
  return data;
};

export function useFetchProducts() {
  
  const { data: products = [] , error, isLoading } = useSWR("/api/products", fetcher);
  
  return { products, loading: isLoading, error };
}
