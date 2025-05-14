import { useQuery } from "@tanstack/react-query";
import api from "configs/api";

const useAllProducts = (query) => {
  const queryKey = ["products", query];
  const queryFn = ({ queryKey }) => {
    const {
      page = 1,
      minPrice = "",
      maxPrice = "",
      limit = 10,
      name = "",
    } = queryKey[1];
    return api.get(
      `/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}&name=${name}`
    );
  };
  return useQuery({ queryKey, queryFn });
};

export { useAllProducts };
