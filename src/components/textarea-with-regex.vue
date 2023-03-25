<template>
  <!--  Поле для ввода большого объема данных с проверкой-->
  <div class="input-group mt-3">
    <span class="input-group-text">{{ spanValue }}</span>
    <textarea
        v-bind:value="this.data"
        @blur="inputData"
        class="form-control" aria-label="With textarea">
            </textarea>
  </div>
  <div
      v-if="error_value"
      class="alert alert-danger customAlert" role="alert">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "textarea-with-regex",
  props: [
    "spanValue",
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