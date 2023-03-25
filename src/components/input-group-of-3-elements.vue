<template>
  <div class="input-group mt-3">
    <span class="input-group-text">ФИО</span>
    <!-- Ввод пользователем своего имени -->
    <input
        type="text" maxlength="25" aria-label="first name" placeholder="Имя" class="form-control"
        v-bind:value="FIO.first_name"
        @input="inputFirstName"
    >
    <!-- Ввод пользователем своей фамилии -->
    <input
        type="text" maxlength="25" aria-label="last name" placeholder="Фамилия" class="form-control"
        v-bind:value="FIO.last_name"
        @input="inputLastName"
    >
    <!-- Ввод пользователем своего отчества -->
    <input
        type="text" maxlength="25" aria-label="patronymic" placeholder="Отчество" class="form-control"
        v-bind:value="FIO.patronymic"
        @input="inputPatronymic"
    >
  </div>
  <div>
    <div
        v-if="error_first_name"
        class="alert alert-danger customAlert" role="alert">
      Имя пользователя не соответствует формату
    </div>
    <div
        v-if="error_last_name"
        class="alert alert-danger customAlert" role="alert">
      Фамилия пользователя не соответствует формату
    </div>
    <div
        v-if="error_patronymic"
        class="alert alert-danger customAlert" role="alert">
      Отчество пользователя не соответствует формату
    </div>
  </div>
</template>

<script>
export default {
  name: "input-group-of-3-elements",
  props: [
    "firstName",
    "lastName",
    "patronymic"
  ],
  data() {
    return {
      FIO: {
        first_name: "",
        last_name: "",
        patronymic: "",
      },
      error_first_name: false,
      error_last_name: false,
      error_patronymic: false,
    }
  },
  methods: {
    // Функция для обработки данных при вводе имени
    inputFirstName(event) {
      this.FIO.first_name = event.target.value;

      let regexp = /^[А-Я][а-я]{2,24}/gmu;

      let result = this.FIO.first_name.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.FIO.first_name) {
          this.error_first_name = false;
        } else {
          this.error_first_name = true;
        }
      } else {
        this.error_first_name = true;
      }
      if (this.FIO.first_name === "") {
        this.error_first_name = false;
      }

      this.$emit('inputFIO', this.FIO.last_name + " " + this.FIO.first_name + " " + this.FIO.patronymic);
    },
    // Функция для обработки ввода фамилии
    inputLastName(event) {
      this.FIO.last_name = event.target.value;

      let regexp = /^[А-Я][а-я]{2,24}/gmu;

      let result = this.FIO.last_name.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.FIO.last_name) {
          this.error_last_name = false;
        } else {
          this.error_last_name = true;
        }
      } else {
        this.error_last_name = true;
      }
      if (this.FIO.last_name === "") {
        this.error_last_name = false;
      }

      this.$emit('inputFIO', this.FIO.last_name + " " + this.FIO.first_name + " " + this.FIO.patronymic);
    },
    // Функция для обработки ввода отчества
    inputPatronymic(event) {
      this.FIO.patronymic = event.target.value;

      let regexp = /^[А-Я][а-я]{2,24}/gmu;

      let result = this.FIO.patronymic.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.FIO.patronymic) {
          this.error_patronymic = false;
        } else {
          this.error_patronymic = true;
        }
      } else {
        this.error_patronymic = true;
      }
      if (this.FIO.patronymic === "") {
        this.error_patronymic = false;
      }

      this.$emit('inputFIO', this.FIO.first_name, this.FIO.last_name, this.FIO.patronymic);
    },
    getFirstNameFromProps(value) {
      this.FIO.first_name = value;
    },
    getLastNameFromProps(value) {
      this.FIO.last_name = value;
    },
    getPatronymicFromProps(value) {
      this.FIO.patronymic = value;
    }
  },
  mounted() {
      this.getFirstNameFromProps(this.$props.firstName);
      this.getLastNameFromProps(this.$props.lastName);
      this.getPatronymicFromProps(this.$props.patronymic);
  }
}
</script>

<style scoped>

</style>