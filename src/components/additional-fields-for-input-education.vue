<template>
  <div :key=id>
    <div v-if="del" class="mb-3" style="display: flex; flex-direction: column;">
      <!--      Удаление блока доп полей для образования-->
      <button
          @click="deleteEducation"
          class="btn btn-danger"
          style="align-self: flex-end;"
      >
        X
      </button>
    </div>
    <!--    Блок доп полей для образования-->
    <!--    Ввод учебное заведение-->
    <div class="input-group">
      <span class="input-group-text">Учебное заведение</span>
      <input
          v-bind:value="educational_institution"
          @input="inputEducationalInstitution"
          class="form-control" :list="id" placeholder="Название учебного заведения"
          aria-label="Учебное заведение">
      <datalist :id="id">
        <option v-for="educational_institution in educational_institutions" :key="educational_institution.id">
          {{
            educational_institution.title
          }}
        </option>
      </datalist>
    </div>
    <div
        v-if="error_educational_institution"
        class="alert alert-danger customAlert" role="alert">
      Учебное заведение не соответствует формату
    </div>
    <!-- Ввод факультета -->
    <div class="input-group mt-3">
      <span class="input-group-text">Факультет</span>
      <input
          v-bind:value="faculty"
          @input="inputFaculty"
          type="text" class="form-control" placeholder="Факультет" aria-label="Факультет"
      >
    </div>
    <div
        v-if="error_faculty"
        class="alert alert-danger customAlert" role="alert">
      Факультет не соответствует формату
    </div>
    <!-- Ввод специализации -->
    <div class="input-group mt-3">
      <span class="input-group-text">Специализация</span>
      <input
          v-bind:value="specialization"
          @input="inputSpecialization"
          type="text" class="form-control" placeholder="Специализация" aria-label="Специализация"
      >
    </div>
    <div
        v-if="error_specialization"
        class="alert alert-danger customAlert" role="alert">
      Специализация не соответствует формату
    </div>
    <!-- Ввод года окончания -->
    <div class="input-group mt-3">
      <span class="input-group-text">Год окончания</span>
      <input
          v-bind:value="year_of_ending"
          @input="inputYearOfEnding"
          type="text" class="form-control" placeholder="Год окончания" aria-label="Год окончания"
      >
    </div>
    <div
        v-if="error_year_of_ending"
        class="alert alert-danger customAlert" role="alert">
      Год не соответствует формату
    </div>
  </div>
</template>

<script>
import {jsonp} from "vue-jsonp";

export default {
  name: "additional-fields-for-input-education",
  props: [
    "id_city",
    "id",
    "delete",
    "dataFromProps"
  ],
  data() {
    return {
      educational_institutions: [],
      url_educational_institution_begin: "https://api.vk.com/method/database.getUniversities?access_token=",
      token: process.env.VUE_APP_TOKEN,
      url_educational_institution_1: "&country_id=1&city_id=",
      url_educational_institution_2: "&country_id=1",
      url_educational_institution_end: "&v=5.131&q=",
      educational_institution: "",
      error_educational_institution: false,
      faculty: "",
      error_faculty: false,
      specialization: "",
      error_specialization: false,
      year_of_ending: "",
      error_year_of_ending: false,
      del: false,
    }
  },
  methods: {
    // Функция для обработки ввода специализации
    inputSpecialization(event) {
      this.specialization = event.target.value;

      let regexp = /^[А-Я][А-Яа-я ]{2,70}/gmu;

      let result = this.specialization.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.specialization) {
          this.error_specialization = false;
        } else {
          this.error_specialization = true;
        }
      } else {
        this.error_specialization = true;
      }
      if (this.specialization === "") {
        this.error_specialization = false;
      }
      this.returnResult();
    },
    // Функция для обработки ввода учебного заведения
    inputEducationalInstitution(event) {
      this.educational_institution = event.target.value;

      let regexp = /^[А-Я][А-Яа-я ()\-.,]{2,100}/gmu;

      let result = this.educational_institution.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.educational_institution) {
          this.error_educational_institution = false;
        } else {
          this.error_educational_institution = true;
        }
      } else {
        this.error_educational_institution = true;
      }
      if (this.educational_institution === "") {
        this.error_educational_institution = false;
      }

      this.getInstitutions();
      this.returnResult();
    },
    // Функция для обработки ввода факультета
    inputFaculty(event) {
      this.faculty = event.target.value;

      let regexp = /^[А-Я][А-Яа-я ]{2,70}/gmu;

      let result = this.faculty.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.faculty) {
          this.error_faculty = false;
        } else {
          this.error_faculty = true;
        }
      } else {
        this.error_faculty = true;
      }
      if (this.faculty === "") {
        this.error_faculty = false;
      }
      this.returnResult();
    },
    // Функция для обработки ввода года окончания
    inputYearOfEnding(event) {
      this.year_of_ending = event.target.value;

      let regexp = /^[1|2][0-9]{3}/gmu;

      let result = this.year_of_ending.match(regexp);

      let date_now = new Date();

      if ((result !== null)) {
        if (result[0] === this.year_of_ending) {
          this.error_year_of_ending = false;
        } else {
          this.error_year_of_ending = true;
        }
      } else {
        this.error_year_of_ending = true;
      }
      if (this.year_of_ending === "") {
        this.error_year_of_ending = false;
      }

      if (this.year_of_ending > date_now.getFullYear()) {
        this.error_year_of_ending = true;
      }

      this.returnResult();
    },
    // Получение списка учебных заведений с помощью апи
    getInstitutions() {
      jsonp(this.url_educational_institution_begin + this.token + this.url_educational_institution_1 + this.id_city + this.url_educational_institution_end + this.educational_institution)
          .then(response => {
            this.educational_institutions = response.response.items;
          });
    },
    // удалить образование
    deleteEducation() {
      this.$emit('deleteEducation', this.id);
    },
    // вернуть данные в компонент выше
    returnResult() {
      this.$emit('getResult', {
        id: this.id,
        educational_institution: this.educational_institution,
        faculty: this.faculty,
        specialization: this.specialization,
        year_of_ending: this.year_of_ending
      });
    },
    getDataFromProps(value) {
      if (value != undefined) {
        this.educational_institution = value.educational_institution;
        this.faculty = value.faculty;
        this.specialization = value.specialization;
        this.year_of_ending = value.year_of_ending;
      }
    }
  },
  mounted() {
    this.getInstitutions();
    this.getDataFromProps(this.$props.dataFromProps);
    this.del = this.delete;
  }
}
</script>

<style scoped>

</style>