import api from "configs/api";

const getAllProducts = (queryKey) => api.get(`/products?page=${queryKey}&limit=10`);

export { getAllProducts };
