<template>
  <div>
    <div>
      <Button
        :active="isStaticPagination"
        @click="setPagination(PaginationTypes.Static)"
        >Static Pagination</Button
      >
      <Button
        :active="!isStaticPagination"
        @click="setPagination(PaginationTypes.Dynamic)"
        >Dynamic pagination</Button
      >
    </div>
    <Table
      :rows="rows"
      :totalPages="totalPages"
      :currentPage="currentPage"
      :pagination="pagination"
      :filters="filters"
      :sort="sort"
      @setFilters="setFilters"
      @setSort="setSort"
      @getPage="getPage"
    >
      <TableColumn width="15%" prop="id" title="ID" />
      <TableColumn width="15%" prop="postId" title="Post ID" />

      <TableColumn width="30%" prop="email">
        <template #title>
          <b>Email</b>
        </template>

        <template #body="{ row }">
          <a :href="`mailto:${row.email}`">{{ row.email }}</a>
        </template>
      </TableColumn>

      <TableColumn width="40%" prop="name" title="Name" />
    </Table>
  </div>
</template>

<script>
import Table from "../components/table";
import TableColumn from "../components/table-column";
import Button from "../components/button.vue";
import { debounce } from "../utils/debounce";
import { api } from "../api";
import { PaginationTypes } from "../utils/pagination";

const PER_PAGE = 10;
const DEFAULT_SKIP = 0;

export default {
  name: "TableView",
  components: {
    Table,
    TableColumn,
    Button,
  },
  created() {
    this.PaginationTypes = PaginationTypes;
    this.blockingPromise = this.getInitialPage(1);
    this.debouncedSetPage = debounce(this.setPage, 500);
    this.debouncedLoadData = debounce(this.loadData, 500);
  },
  data() {
    return {
      pagination: PaginationTypes.Static,
      rows: [],
      currentPage: 1,
      total: 0,
      totalPages: 0,
      filters: {},
      sort: {},
    };
  },
  computed: {
    isStaticPagination() {
      return this.pagination === PaginationTypes.Static;
    },
    paginationParams() {
      return {
        email: this.filters.email,
        name: this.filters.name,
        id: this.filters.id,
        postId: this.filters.postId,
        sort: this.sort,
      };
    },
  },
  methods: {
    setPagination(pagination) {
      this.pagination = pagination;
      this.getInitialPage();
    },

    applyFilters() {
      this.blockingPromise = this.isStaticPagination
        ? this.debouncedSetPage(1)
        : this.debouncedLoadData();
    },

    setFilters(filters) {
      this.filters = filters;
      this.applyFilters();
    },

    setSort(sort) {
      this.sort = sort;
      this.applyFilters();
    },

    setTableParams(params) {
      this.rows = params.items;
      this.total = params.total;
      this.totalPages = params.totalPages;
      this.currentPage = params.page;
    },

    async setPage(page = 1) {
      if (page <= 0 || (this.totalPages && this.totalPages < page)) {
        return;
      }
      const data = await api.getStaticPage({
        page,
        perPage: PER_PAGE,
        ...this.paginationParams,
      });
      this.setTableParams({ ...data, page });
      this.blockingPromise = null;
    },

    async loadData() {
      const data = await api.getDynamicPage({
        skip: DEFAULT_SKIP,
        perPage: PER_PAGE,
        ...this.paginationParams,
      });
      this.setTableParams(data);
      this.blockingPromise = null;
    },

    async loadMoreData() {
      const data = await api.getDynamicPage({
        skip: DEFAULT_SKIP + this.rows.length,
        perPage: PER_PAGE,
        ...this.paginationParams,
      });
      const items = [...this.rows, ...data.items];
      this.setTableParams({ ...data, items });
      this.blockingPromise = null;
    },

    async getInitialPage() {
      if (this.blockingPromise) {
        return;
      }
      this.blockingPromise = this.isStaticPagination
        ? this.setPage(1)
        : this.loadData();
    },

    async getPage(page) {
      if (this.blockingPromise) {
        return;
      }
      this.blockingPromise = this.isStaticPagination
        ? this.setPage(page)
        : this.loadMoreData();
    },
  },
};
</script>
