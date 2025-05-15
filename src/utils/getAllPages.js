import axios from "axios";

import api from "configs/api";

const getAllPages = (totalPages) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return axios
    .all(pages.map((i) => api.get(`/products?limit=10&page=${i}`)))
    .then(
      axios.spread((...res) => {
        return res.flatMap((res) => res.data);
      })
    );
};

export default getAllPages;
