<script lang="jsx">
import { getPagination } from "../utils/pagination";

export default {
  functional: true,
  name: "oz-table-paginator",
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
  },
  render(h, ctx) {
    const { $style, listeners, props } = ctx;
    const { currentPage, totalPages } = props;
    const { getPage } = listeners;
    const pageNumbers = getPagination({ currentPage, totalPages });

    return (
      <div class={$style.pagination}>
        <span class={$style.control} on={{ click: () => getPage(1) }}>
          {"<<"}
        </span>
        <span
          class={$style.control}
          on={{ click: () => getPage(currentPage - 1) }}
        >
          {"<"}
        </span>
        {...pageNumbers.map((number) => (
          <span
            class={[
              $style.control,
              { [$style.active]: currentPage === number },
            ]}
            on={{ click: () => getPage(number) }}
          >
            {number}
          </span>
        ))}
        <span
          class={$style.control}
          on={{ click: () => getPage(currentPage + 1) }}
        >
          {">"}
        </span>
        <span class={$style.control} on={{ click: () => getPage(totalPages) }}>
          {">>"}
        </span>
      </div>
    );
  },
};
</script>

<style module>
.pagination {
  display: flex;
  justify-content: center;
  height: 48px;
  width: 100%;
  background-color: #fb1058;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #c8cacc;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.control {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.control:last-of-type {
  margin-right: 0;
}

.control:hover {
  cursor: pointer;
}

.control.active {
  color: cornflowerblue;
  background: #005bff;
  color: #fff;
  border-radius: 6px;
}
</style>
