const getInitialQuery = (searchParams) => {
  const query = {};
  const page = searchParams.get("page");
  if (page) query.page = page;
  return query;
};

export { createQueryObject, getInitialQuery };
