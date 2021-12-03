const normalize = (value) => String(value).toLowerCase().trim();

const getFilters = (query) => {
  const filters = [];

  if (query.id) {
    filters.push((row) => normalize(row.id).includes(normalize(query.id)));
  }

  if (query.postId) {
    filters.push((row) =>
      normalize(row.postId).includes(normalize(query.postId))
    );
  }

  if (query.email) {
    filters.push((row) =>
      normalize(row.email).includes(normalize(query.email))
    );
  }

  if (query.name) {
    filters.push((row) => normalize(row.name).includes(normalize(query.name)));
  }

  return (row) => filters.every((filter) => filter(row));
};

module.exports = { getFilters };
