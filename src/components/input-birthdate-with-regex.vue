<template>
<!--  Ввод др-->
  <div class="input-group mt-3">
    <span class="input-group-text">Дата рождения</span>
    <input
        v-bind:value="birthdate"
        @input="inputBirthdate"
        type="date" class="form-control" placeholder="YYYY-MM-DD" aria-label="birthdate"
    >
  </div>
  <div
      v-if="error_birthdate"
      class="alert alert-danger customAlert" role="alert">
    Поздравляю, вы слишком молоды.
  </div>
</template>

<script>
export default {
  name: "input-birthdate-with-regex",
  props: [
      "dataFromProps"
  ],
  data() {
    return{
      birthdate: "",
      error_birthdate: "",
    }
  },
  methods: {
    // Обработка ввода др и отправка данных в компонент выше
    inputBirthdate(event) {
      this.birthdate = event.target.value;

      let date_array = this.birthdate.split('-');

      let date_birthdate = new Date(date_array[0], date_array[1], date_array[2]);
      let date_now = new Date();

      date_birthdate.setFullYear(date_birthdate.getFullYear() + 18);

      if (date_birthdate.getTime() > date_now.getTime()) {
        this.error_birthdate = true;
      } else {
        this.error_birthdate = false;
      }

      this.$emit('getData', this.birthdate);
    },
    getDataFromProps (value)
    {
      this.birthdate = value;
    }
  },
  mounted() {
    this.getDataFromProps(this.$props.dataFromProps);
  }
}
</script>

<style scoped>

</style>