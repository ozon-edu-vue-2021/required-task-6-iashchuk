const { orderBy } = require("lodash/collection");

const sortByParams = (array, params) => {
  if (!params?.length) {
    return array;
  }

  const { fields, orders } = params.reduce(
    (acc, item) => {
      const [key, order] = item.split(".");
      acc.fields.push(key);
      acc.orders.push(order);

      return acc;
    },
    {
      fields: [],
      orders: [],
    }
  );

  return orderBy(array, fields, orders);
};

module.exports = { sortByParams };
