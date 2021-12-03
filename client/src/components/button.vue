<script lang="jsx">
export default {
  functional: true,
  name: "oz-button",
  props: {
    active: {
      type: Boolean,
    },
  },
  render(h, ctx) {
    const { $style, scopedSlots, listeners, props } = ctx;
    const { active } = props;
    const { click } = listeners;
    const className = active ? $style.buttonActive : $style.button;

    return (
      <button class={className} on={{ click }}>
        {scopedSlots.default()}
      </button>
    );
  },
};
</script>

<style module>
.button {
  margin: 20px;
  padding: 10px 20px;
  background: none;
  color: #fb1058;
  font-weight: bold;
  border: 2px solid #005bff;
  border-radius: 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.buttonActive {
  composes: button;
  color: #fff;
  background: #fb1058;
}

.button:hover {
  opacity: 0.7;
}

.buttonActive:hover {
  opacity: 1;
  cursor: auto;
}
</style>
