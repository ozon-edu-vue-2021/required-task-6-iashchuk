const { getFilters } = require("../lib/getFilters");
const { sortByParams } = require("../lib/sort");
const { normalizeQuery } = require("../lib/normalizeQuery");

const getStaticData = (appData) => (req, res) => {
  const { page = 1, perPage = 10, sort } = normalizeQuery(req.query);

  const filters = getFilters(req.query);
  const filteredData = appData.filter(filters);
  const sortedData = sortByParams(filteredData, sort);

  const totalPages = perPage ? Math.ceil(sortedData.length / perPage) : 1;

  const skip = (page - 1) * perPage;

  res.status(200).json({
    items: sortedData.slice(skip, skip + perPage),
    total: sortedData.length,
    totalPages,
  });
};

module.exports = { getStaticData };
