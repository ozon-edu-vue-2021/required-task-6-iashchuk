const normalizeQuery = (query) => {
  return {
    skip: Number(query.skip) || undefined,
    page: Number(query.page) || undefined,
    perPage: Number(query.perPage) || undefined,
    id: Number(query.id) || undefined,
    postId: Number(query.limit) || undefined,
    email: query.email,
    name: query.name,
    sort: Array.isArray(query.sort) ? query.sort : [],
  };
};

module.exports = { normalizeQuery };
