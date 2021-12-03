export const PaginationTypes = {
  Static: "static",
  Dynamic: "dynamic",
};

export const getPagination = ({ currentPage, totalPages }) => {
  if (currentPage <= 4) {
    if (totalPages > 5) {
      return [1, 2, 3, 4, 5];
    }

    return Array(totalPages)
      .fill(null)
      .map((_item, index) => index + 1);
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
};
