import api from "configs/api";

const getAllProducts = (queryKey) => api.get(`/products?page=${queryKey[1]}&limit=10`);

export { getAllProducts };
