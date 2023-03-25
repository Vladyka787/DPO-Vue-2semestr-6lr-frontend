<template>
<!--  Простой инпут для таких данных как Статус-->
  <div class="input-group">
    <label class="input-group-text">{{ spanValue }}</label>
    <select
        class="form-select"
        v-bind:value="data"
        @input="inputData"
    >
      <option selected>{{ initial_value }}</option>
      <option v-for="value in options" :key="value.id">{{ value.value }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "input-simple-select",
  props: [
      "options",
      "initial_value",
      "spanValue",
      "dataFromProps"
  ],
  data() {
    return{
      data: ""
    }
  },
  methods: {
    inputData(event){
      this.data = event.target.value;
      this.$emit('getData', this.data);
    },
    getDataFromProps(value)
    {
      this.data = value;
    }
  },
  mounted() {
    if(this.$props.dataFromProps != "")
    {
      this.data = this.$props.dataFromProps;
    }else {
      this.data = this.$props.initial_value;
    }

    this.$emit('getData', this.data);
  },
  watch: {
    dataFromProps(newValue)
    {
      this.getDataFromProps(newValue);
    }
  }
}
</script>

<style scoped>

</style>