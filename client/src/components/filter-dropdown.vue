<script lang="jsx">
export default {
  functional: true,
  name: "oz-filter-dropdown",
  props: {
    columnProp: {
      type: String,
      default: "",
    },
    shown: {
      type: Boolean,
      default: false,
    },
    filterText: {
      type: String,
      default: "",
    },
  },
  render(h, ctx) {
    const { $style, listeners, props } = ctx;
    const { shown, filterText } = props;
    const { setFilterTooltip, setFilterText, closeFilterTooltip } = listeners;

    return (
      <v-dropdown
        class={$style.filterIcon}
        triggers={[]}
        autoHide={false}
        shown={shown}
      >
        <font-awesome-icon icon="filter" on={{ click: setFilterTooltip }} />
        <font-awesome-icon
          v-show={filterText}
          class={$style.timesIcon}
          icon="times"
          on={{ click: () => setFilterText({ target: { value: "" } }) }}
        />

        <div slot="popper">
          <input
            type="text"
            domProps={{ value: filterText }}
            on={{ input: setFilterText }}
          />

          <font-awesome-icon
            icon="times"
            class={$style.closeIcon}
            on={{ click: closeFilterTooltip }}
          />
        </div>
      </v-dropdown>
    );
  },
};
</script>

<style module>
.filterIcon {
  margin-left: auto;
  margin-right: 8px;
}

.filterIcon:hover {
  cursor: pointer;
}

.timesIcon {
  margin-left: 8px;
  color: red;
}

.closeIcon {
  position: absolute;
  top: 6px;
  right: 6px;
}

.closeIcon:hover {
  cursor: pointer;
}
</style>
