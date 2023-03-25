<template>
  <!--  ввод с проверкой таких данных как Профессия, имейла и т.д.-->
  <div class="input-group mt-3">
    <span class="input-group-text">{{ spanValue }}</span>
    <input
        v-bind:value="this.data"
        @input="inputData"
        type="text" class="form-control"
        :aria-label="ariaLabelValue"
        :placeholder="placeholderValue"
    >
  </div>
  <div
      v-if="error_value"
      class="alert alert-danger customAlert" role="alert">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "input-with-regex",
  props: [
    "spanValue",
    "placeholderValue",
    "ariaLabelValue",
    "errorMessage",
    "regexPattern",
    "dataFromProps"
  ],
  data() {
    return {
      data: "",
      error_value: "",
    }
  },
  methods: {
    inputData(event) {
      this.data = event.target.value;

      let regexp = new RegExp(this.regexPattern);

      let result = this.data.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.data) {
          this.error_value = false;
        } else {
          this.error_value = true;
        }
      } else {
        this.error_value = true;
      }
      if (this.data === "") {
        this.error_value = false;
      }

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