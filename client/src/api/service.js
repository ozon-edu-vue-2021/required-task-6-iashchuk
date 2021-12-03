import axios from "axios";

import { endpoints } from "./endpoints";

const parseSort = (sort) =>
  Object.entries(sort)
    .map(([key, value]) => value && `${key}.${value}`)
    .filter(Boolean);

export const commentService = {
  getStaticPage: async (params) => {
    const { perPage, page, email, name, id, postId, sort } = params;

    try {
      const { data } = await axios.get(endpoints.pagination.static, {
        params: {
          perPage,
          page,
          email,
          name,
          id,
          postId,
          sort: parseSort(sort),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  getDynamicPage: async (params) => {
    const { skip, perPage, email, name, id, postId, sort } = params;

    try {
      const { data } = await axios.get(endpoints.pagination.dynamic, {
        params: {
          perPage,
          skip,
          email,
          name,
          id,
          postId,
          sort: parseSort(sort),
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};
