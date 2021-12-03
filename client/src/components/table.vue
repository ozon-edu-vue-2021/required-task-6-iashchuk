<script lang="jsx">
import DotsLoaderIcon from "../assets/dots-loader.svg";
import TablePaginator from "./table-paginator";
import FilterDropdown from "./filter-dropdown";
import { PaginationTypes } from "../utils/pagination";

export default {
  name: "oz-table",
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    pagination: {
      type: String,
      default: "static",
    },
    filters: {
      type: Object,
    },
    sort: {
      type: Object,
    },
  },
  data() {
    return {
      openedFilter: null,
      openedFilterText: "",
    };
  },
  methods: {
    toggleSort(field, newValue) {
      if (newValue !== undefined) {
        this.$emit("setSort", { ...this.sort, [field]: newValue });
        return;
      }

      const value = this.sort[field] === "desc" ? "asc" : "desc";
      this.$emit("setSort", { ...this.sort, [field]: value });
    },
    setFilterTooltip(filter = null) {
      this.openedFilter = filter;
      this.openedFilterText = this.filters[filter] || "";
    },
    setOpenedFilterText(field, text) {
      this.$emit("setFilters", { ...this.filters, [field]: text });
    },
    renderHead(h, columnsOptions) {
      const { $style, sort, openedFilter, filters } = this;
      return columnsOptions.map(({ prop, title, scopedSlots }) => {
        const renderedTitle = scopedSlots.title ? scopedSlots.title() : title;
        const sortValue = sort[prop];
        let sortIcon = "sort";

        if (sortValue) {
          sortIcon = `sort-amount-${sortValue === "asc" ? "down" : "up"}`;
        }

        return (
          <th key={prop} class={$style.headerCell}>
            <div class={$style.headerCellContent}>
              <span>{renderedTitle}</span>
              <font-awesome-icon
                class={$style.sortIcon}
                icon={sortIcon}
                on={{ click: () => this.toggleSort(prop) }}
              />
              <font-awesome-icon
                class={$style.reset}
                v-show={sortValue}
                icon="times"
                color="red"
                on={{ click: () => this.toggleSort(prop, "") }}
              />
              <FilterDropdown
                columnProp={prop}
                shown={prop === openedFilter}
                filterText={filters[prop]}
                on={{
                  setFilterTooltip: () => this.setFilterTooltip(prop),
                  closeFilterTooltip: () => this.setFilterTooltip(),
                  setFilterText: (evt) =>
                    this.setOpenedFilterText(prop, evt.target.value),
                }}
              />
            </div>
          </th>
        );
      });
    },
    renderRows(h, columnsOptions) {
      return this.rows.map((row, index) => (
        <tr key={row.id || index}>
          {...this.renderColumns(h, row, columnsOptions)}
        </tr>
      ));
    },
    renderColumns(h, row, columnsOptions) {
      return columnsOptions.map(({ prop, width, scopedSlots }) => (
        <td key={prop} style={{ width }} class={this.$style.cell}>
          {scopedSlots.body ? scopedSlots.body({ row }) : row[prop]}
        </td>
      ));
    },
    getColumnOptions() {
      return this.$slots.default
        .filter(
          ({ componentOptions }) => componentOptions?.tag === "TableColumn"
        )
        .map(({ componentOptions, data }) => ({
          ...componentOptions.propsData,
          scopedSlots: data.scopedSlots || {},
        }));
    },
    renderInfPager() {
      if (this.currentPage >= this.totalPages) {
        return null;
      }

      const directives = [
        {
          name: "detect-viewport",
          value: {
            callback: this.$listeners.getPage,
          },
        },
      ];

      const style = {
        background: `url("${DotsLoaderIcon}") no-repeat center`,
      };

      return <div {...{ class: this.$style.infPager, style, directives }} />;
    },
  },
  render(h) {
    const { $style, totalPages, currentPage, pagination, $listeners } = this;
    const { getPage } = $listeners;
    const columnsOptions = this.getColumnOptions();
    const columnsHead = this.renderHead(h, columnsOptions);
    const rows = this.renderRows(h, columnsOptions);

    return (
      <div class={$style.container}>
        <table class={$style.table}>
          <thead>{...columnsHead}</thead>
          <tbody>{...rows}</tbody>
        </table>

        {pagination === PaginationTypes.Static ? (
          <TablePaginator
            totalPages={totalPages}
            currentPage={currentPage}
            on={{ getPage }}
          />
        ) : (
          this.renderInfPager()
        )}
      </div>
    );
  },
};
</script>

<style module>
.container {
  width: 100%;
}

.table {
  border-spacing: 0;
  margin: 8px;
  width: 100%;
  text-transform: uppercase;
}

.cell {
  text-align: left;
  border-bottom: 1px solid #c8cacc;
  padding: 1rem 1rem;
}

.headerCell {
  composes: cell;
  background-color: #005bff;
  color: #fff;
}

.headerCellContent {
  display: flex;
  align-items: center;
}

.sortIcon {
  margin-left: 8px;
  margin-right: 8px;
}

.sortIcon:hover {
  cursor: pointer;
}

.infPager {
  width: 100%;
  height: 32px;
}

.reset {
  cursor: pointer;
}

.reset:hover {
  opacity: 0.7;
}
</style>
