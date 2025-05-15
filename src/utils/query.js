const getInitialQuery = (searchParams) => {
  const query = {};
  const page = searchParams.get("page");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const name = searchParams.get("name");
  if (page) query.page = +page;
  if (minPrice !== null) query.minPrice = minPrice;
  if (maxPrice !== null) query.maxPrice = maxPrice;
  if (name) query.name = name;
  return query;
};

export { getInitialQuery };
