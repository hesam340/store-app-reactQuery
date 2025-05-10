import { useQuery } from "@tanstack/react-query";
import api from "configs/api";

const useAllProducts = (page) => {
  const queryKey = ["products", page];
  const queryFn = ({queryKey}) => api.get(`/products?page=${queryKey[1]}&limit=10`);
  return useQuery({ queryKey, queryFn });
};

export { useAllProducts };
