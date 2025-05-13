import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "configs/api";
import { toast } from "react-toastify";

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("/products", data);
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("کالای جدید با موفقیت اضافه شد");
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است");
    },
  });
};

const useEditProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({ id, ...data }) => api.put(`/products/${id}`, data);
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("اطلاعات کالای مورد نظر ویرایش شد");
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است");
    },
  });
};

const useGroupDeleteProducts = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => {
    const newData = { ids: [] };
    const result = data.map((i) => {
      return i.id;
    });
    newData.ids.push(...result);
    api.delete("/products", { data: newData });
  };
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("کالاهای مذکور با موفقیت حذف شدند");
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است");
    },
  });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id) => api.delete(`/products/${id}`);
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("کالای مذکور حذف شد");
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است");
    },
  });
};

export {
  useAddProduct,
  useGroupDeleteProducts,
  useEditProduct,
  useDeleteProduct,
};
