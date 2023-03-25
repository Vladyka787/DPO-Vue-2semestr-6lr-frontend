<template>
  <!--  Простой инпут для таких данных как ЗП-->
  <div class="input-group mt-3">
    <span class="input-group-text">{{ spanValue }}</span>
    <input
        v-bind:value="data"
        @input="inputData"
        type="range"
        class="form-range"
        :placeholder="placeholderValue"
        :aria-label="ariaLabelValue"
        :min="minValue"
        :max="maxValue"
        :step="spanValue"
    >
  </div>
</template>

<script>
export default {
  name: "input-simple-range",
  props: [
    'placeholderValue',
    'ariaLabelValue',
    'minValue',
    'maxValue',
    'stepValue',
    "spanValue",
    "dataFromProps"
  ],
  data() {
    return {
      data: '',
    }
  },
  methods: {
    inputData(event) {
      this.data = event.target.value;
      this.$emit('getData', this.data);
    },
    getDataFromProps(value) {
      this.data = value;
    }
  },
  mounted() {
    this.getDataFromProps(this.$props.dataFromProps);
  }
}
</script>

<style scoped>

</style>