<template>
    <button
      class="ym-button"
      @click="handleClick"
    >
      <slot></slot>
    </button>
</template>

<script>

export default {
  name: 'ym-button',
  methods: {
    handleClick (event) {
      if (this.disabled) return
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="css">
.ym-button {
  color: #495060;
  background: #f7f7f7;
  border: 1px solid #dddee1;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 16px;
  margin: 0px;
  padding: 12px 20px;
  position: relative;
}
</style>
