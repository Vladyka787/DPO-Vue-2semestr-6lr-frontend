<template>
  <!--  Выбор уровня образования-->
  <div class="input-group mt-3">
    <label class="input-group-text" aria-disabled="true">Образование</label>
    <select
        class="form-select"
        v-bind:value="selectValue"
        @input="inputSelectValue"
    >
      <option disabled value="">Выбрать...</option>
      <option v-for="value in options" :key="value.id">{{ value.value }}</option>
    </select>
  </div>
  <!--  Показ доп полей-->
  <div
      v-if="toggleValue"
  >
    <div class="myBorderEducation mt-3 container-fluid p-3">
      <additional-fields-for-input-education
          :id_city="id_city"
          :id=1
          :delete=false
          @getResult="processingResult"
          :data-from-props="base_additional_fields"
      />
    </div>
    <div class="mt-3" style="display: flex; flex-direction: column;">
      <!--      Для получения большего количества доп полей-->
      <button
          style="align-self: flex-end;"
          class="btn btn-light"
          @click="addEducation">
        Указать еще одно место обучения
      </button>
    </div>
    <div class="myBorderEducation mt-3 container-fluid p-3"
         v-for="education in educations" v-bind:key="education.id">
      <additional-fields-for-input-education
          :id="education.id"
          :id_city="id_city"
          :delete=true
          @deleteEducation="deleteEducation"
          @getResult="processingResult"
          :data-from-props="education.body"
      />
    </div>

  </div>
</template>

<script>

import AdditionalFieldsForInputEducation from "@/components/additional-fields-for-input-education.vue";

export default {
  name: "input-education-with-use-api",
  components: {AdditionalFieldsForInputEducation},
  props: [
    "id_city",
    "level_of_education",
    "all_education",
  ],
  data() {
    return {
      options: [
        {id: 1, value: "Среднее"},
        {id: 2, value: "Среднее специальное"},
        {id: 3, value: "Неоконченное высшее"},
        {id: 4, value: "Высшее"},
      ],
      selectValue: "",
      toggleValue: false,
      educations: [],
      resultEducation: [],
      id_counter: 5,
      base_additional_fields: {}
    }
  },
  methods: {
    // Обработка ввода уровня образования
    inputSelectValue(event) {
      this.selectValue = event.target.value;
      if (this.selectValue === "Среднее") {
        this.toggleValue = false;
      } else {
        this.toggleValue = true;
      }

      this.$emit('getSelect', this.selectValue);
    },
    // Добавление дополнительных полей
    addEducation() {
      this.educations.push({id: this.id_counter});
      this.id_counter++;
    },
    // Удаление полей
    deleteEducation(idEducation) {
      this.educations = this.educations.filter(post => post.id !== idEducation);
      this.resultEducation = this.resultEducation.filter(post => post.id !== idEducation);

      this.$emit('returnAllEducation', this.resultEducation);
    },
    // Вывод результатов в компонент выше
    processingResult(education) {
      this.resultEducation = this.resultEducation.filter(post => post.id !== education.id);
      this.resultEducation.push(education);

      this.$emit('returnAllEducation', this.resultEducation);
    },
    getLevelEducationFromProps(value) {
      if (value != undefined) {
        this.selectValue = value;

        if (this.selectValue === "Среднее") {
          this.toggleValue = false;
        } else {
          this.toggleValue = true;
        }
      }
    },
    getAllEducation(value) {
      if (value != undefined) {
        for (let i = 0; i < value.length; i++) {
          let temp = {};
          if (i == 0) {
            this.base_additional_fields = value[i];
            for (let key in value[i]) {
              temp[key] = value[i][key];
            }
            temp.id = 1;
            this.resultEducation.push(temp);
          } else {
            for (let key in value[i]) {
              temp[key] = value[i][key];
            }
            temp.id = this.id_counter;
            this.resultEducation.push(temp);
            let tempForArrayEducations = {};
            tempForArrayEducations.id = this.id_counter;
            tempForArrayEducations.body = value[i];
            this.educations.push(tempForArrayEducations);
            this.id_counter++;
          }
        }
      }
    }
  },
  mounted() {
    this.getLevelEducationFromProps(this.$props.level_of_education);
    this.getAllEducation(this.$props.all_education);
  }
}
</script>

<style scoped>
</style>