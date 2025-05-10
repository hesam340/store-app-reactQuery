import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "configs/api";

const useAddProduct = () => {
  const queryClient = useQueryClient()
  const mutationFn = () => api.post("/products", data);
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries("products")
  });
}

export { useAddProduct };
