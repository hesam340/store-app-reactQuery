import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "configs/api";
import { toast } from "react-toastify";

const useAddProduct = () => {
  const queryClient = useQueryClient()
  const mutationFn = (data) => api.post("/products", data);
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("کالای جدید با موفقیت اضافه شد")
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است")
    }
  });
}

export { useAddProduct };
