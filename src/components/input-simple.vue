<template>
  <!--  Простой ввод таких данных как Ссылка на фото и т.д.-->
  <div class="input-group mt-3">
    <span class="input-group-text">{{ spanValue }}</span>
    <input
        v-bind:value="data"
        @input="inputData"
        type="text"
        class="form-control"
        :aria-label="ariaLabelValue"
        :placeholder="placeholderValue"
    >
  </div>
</template>

<script>
export default {
  name: "input-simple",
  props: [
    "spanValue",
    "placeholderValue",
    "ariaLabelValue",
    "dataFromProps"
  ],
  data() {
    return {
      data: "",
    }
  },
  methods: {
    inputData(event) {
      this.data = event.target.value;
      this.$emit('getData', this.data);
    },
    getDataFromProps (value)
    {
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