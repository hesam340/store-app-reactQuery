const getInitialQuery = (searchParams) => {
  const query = {};
  const page = searchParams.get("page");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (page) query.page = +page;
  if (minPrice !== null) query.minPrice = minPrice;
  if (maxPrice !== null) query.maxPrice = maxPrice;
  return query;
};

export { getInitialQuery };
