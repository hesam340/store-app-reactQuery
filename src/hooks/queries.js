import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "services/products";

const useAllProducts = (page) => {
  const queryKey = ["products", page];
  const queryFn = ({queryKey}) => getAllProducts(queryKey[1]);
  return useQuery({ queryKey, queryFn });
};

export { useAllProducts };
