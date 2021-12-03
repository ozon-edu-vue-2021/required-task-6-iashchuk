const { getFilters } = require("../lib/getFilters");
const { sortByParams } = require("../lib/sort");
const { normalizeQuery } = require("../lib/normalizeQuery");

const getDynamicData = (appData) => (req, res) => {
  const { skip = 0, perPage = 10, sort } = normalizeQuery(req.query);

  const filters = getFilters(req.query);
  const filteredData = appData.filter(filters);
  const sortedData = sortByParams(filteredData, sort);

  const totalPages = perPage ? Math.ceil(sortedData.length / perPage) : 1;

  res.status(200).json({
    items: sortedData.slice(skip, skip + perPage),
    total: sortedData.length,
    page: Math.round(skip / perPage + 1),
    totalPages,
  });
};

module.exports = { getDynamicData };
