import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "services/products";

const useAllProducts = () => {
  const queryKey = ["products",3];
  const queryFn = ({queryKey})=> getAllProducts(queryKey);
  return useQuery({ queryKey, queryFn });
};

export { useAllProducts };
