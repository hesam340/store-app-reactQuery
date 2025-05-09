const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.page === 1) {
    const { page, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

export default createQueryObject;
