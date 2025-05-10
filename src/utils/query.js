const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.page === 1) {
    const { page, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const page = searchParams.get("page");
  if (page) query.page = page;
  return query;
};

export { createQueryObject, getInitialQuery };
