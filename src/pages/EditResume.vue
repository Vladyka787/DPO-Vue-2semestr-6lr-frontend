<template>
  <!--  Страница редактирования резюме-->
  <div v-if="perem">
    <div class="container-fluid" style="display: flex; flex-direction: column;">
      <button @click="sendResumeToEdit" class="btn btn-success mt-2" style="align-self: flex-end;">
        Отредактировать
      </button>
    </div>
    <div class="container-fluid overflow-hidden">
      <div class="row justify-content-evenly m-2">
        <!-- Левая часть экрана, место для ввода пользователем данных -->
        <div class="col">
          <div class="p-3 myBorder">
            <!--          Поле ввода статуса-->
            <input-simple-select
                initial_value="Новый"
                :options="statusArray"
                spanValue="Статус"
                @getData="inputStatus"
                :data-from-props="status"
            />
            <!--          Поле ввода ФИО-->
            <input-group-of3-elements
                @inputFIO="inputFIO"
                :first-name="first_name"
                :last-name="last_name"
                :patronymic="patronymic"
            />
            <!--          Поле ввода города-->
            <input-with-use-api-city
                @getData="inputCity"
                @getIdCity="inputCityId"
                :city-props="city"
            />
            <!--          Поле ввода фото-->
            <input-simple
                spanValue="Ссылка на фото"
                placeholderValue="URL"
                ariaLabelValue="URL"
                @getData="inputFhoto"
                :data-from-props="photo"
            />
            <!--          Поле ввода профессии-->
            <input-with-regex
                spanValue="Профессия"
                placeholderValue="Профессия"
                ariaLabelValue="Профессия"
                errorMessage="Профессия не соответствует формату"
                regexPattern='^[А-Я][А-Яа-я ]{2,70}'
                @getData="inputProfession"
                :data-from-props="profession"
            />
            <!--          Поле ввода телефона-->
            <input-with-regex
                spanValue="Телефон"
                placeholderValue="Номер телефона"
                ariaLabelValue="Телефон"
                errorMessage="Номер не соответствует формату"
                regexPattern='^((\+7|7|8)+([0-9]){10})$'
                @getData="inputPhoneNumber"
                :data-from-props="phoneNumber"
            />
            <!--          Поле ввода имейла-->
            <input-with-regex
                spanValue="EMAIL"
                placeholderValue="example@mail.com"
                ariaLabelValue="email"
                errorMessage="EMAIL не соответствует формату"
                regexPattern='^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$'
                @getData="inputEmail"
                :data-from-props="email"
            />
            <!--          Поле ввода др-->
            <input-birthdate-with-regex
                @getData="inputBirthdate"
                :data-from-props="birthdate"
            />
            <!--          Поле ввода образования-->
            <input-education-with-use-api
                :id_city="id_city"
                @returnAllEducation="inputEducation"
                @getSelect="inputSelectEducation"
                :level_of_education="education"
                :all_education="allEducation"
            />
            <!--          Поле ввода зарплаты-->
            <input-simple-range
                spanValue="Желаемая ЗП (₽)"
                placeholderValue="ЗП"
                ariaLabelValue="ЗП"
                minValue="15000"
                maxValue="250000"
                stepValue="1000"
                @getData="inputSalary"
                :data-from-props="salary"
            />
            <!--          Поле ввода ключевых навыков-->
            <textarea-with-regex
                spanValue="Ключевые навыки"
                errorMessage="Используйте буквы латинского алфавита. А так же пробелы и . , ! ? : ;"
                regexPattern='^[а-яА-Я .,!?:;]{0,200}'
                @getData="inputKeySkills"
                :data-from-props="key_skills"
            />
            <!--          Поле ввода данных о себе-->
            <textarea-with-regex
                spanValue="О себе"
                errorMessage="Используйте буквы латинского алфавита. А так же пробелы и . , ! ? : ;"
                regexPattern='^[а-яА-Я .,!?:;]{0,200}'
                @getData="inputAboutMe"
                :data-from-props="about_me"
            />
          </div>
        </div>
        <!-- Правая часть экрана, отображения данных введенным пользователем -->
        <div class="col">
          <div class="p-3 myBorder" style="display: flex;">
            <div class="me-3"
                 style="min-height: 300px; min-width: 250px; max-height: 300px; max-width: 250px; background-color: white;">
              <img :src="photo" class="img-fluid" style="display: flex; justify-content: center; color: #727A82;"
                   alt="Тут могло быть ваше фото">
            </div>
            <div>
              <div>Статус: {{ status }}</div>
              <br>
              <div>ФИО: {{ last_name }} {{ first_name }} {{ patronymic }}</div>
              <br>
              <div>Город: {{ city }}</div>
              <br>
              <div>Профессия: {{ profession }}</div>
              <br>
              <div>Номер телефона: {{ phoneNumber }}</div>
              <br>
              <div>EMAIL: {{ email }}</div>
              <br>
              <div>Дата рождения: {{ birthdate }}</div>
              <br>
              <div>Уровень образования: {{ education }}</div>
              <div v-if="toggleEducation" class="mt-1">
                <div
                    v-for="value in allEducation" v-bind:key="value.id"
                    class="myBorderEducation container-fluid"
                >
                  Учебное заведение: {{ value.educational_institution }} <br>
                  Факультет: {{ value.faculty }} <br>
                  Специализация: {{ value.specialization }} <br>
                  Год окончания: {{ value.year_of_ending }}
                </div>
              </div>
              <br>
              <div>Желаемая зарплата: {{ salary }}₽</div>
              <br>
              <div>Ключевые навыки: {{ key_skills }}</div>
              <br>
              <div>О себе: {{ about_me }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid" v-else>
    Не существует резюме с айди {{ $route.params.id }}
  </div>
</template>

<script>
import axios from 'axios'
import inputGroupOf3Elements from '@/components/input-group-of-3-elements.vue'
import inputWithRegex from '@/components/input-with-regex.vue'
import textareaWithRegex from "@/components/textarea-with-regex.vue";
import InputBirthdateWithRegex from "@/components/input-birthdate-with-regex.vue";
import InputSimple from "@/components/input-simple.vue";
import InputSimpleRange from "@/components/input-simple-range.vue";
import InputSimpleSelect from "@/components/input-simple-select.vue";
import InputWithUseApiCity from "@/components/input-with-use-api-city.vue";
import InputEducationWithUseApi from "@/components/input-education-with-use-api.vue";

export default {
  name: "EditResume",
  components: {
    InputEducationWithUseApi,
    InputWithUseApiCity,
    InputSimpleSelect,
    InputSimpleRange,
    InputSimple,
    InputBirthdateWithRegex,
    inputGroupOf3Elements,
    inputWithRegex,
    textareaWithRegex
  },
  data() {
    return {
      perem: false,
      first_name: "",
      last_name: "",
      patronymic: "",
      photo: '',
      profession: "",
      phoneNumber: "",
      email: "",
      birthdate: "",
      education: "",
      toggleEducation: false,
      salary: "",
      key_skills: "",
      about_me: "",
      status: "",
      city: "",
      id_city: "",
      statusArray: [
        {id: 1, value: "Назначено собеседование"},
        {id: 2, value: "Принят"},
        {id: 3, value: "Отказ"},
      ],
      allEducation: [],
    }
  },
  methods: {
    // Функция для проверки сущетсвует ли в бд резюме с определенным айди
    async proverka() {
      let myResponse = {};
      try {
        await axios
            .get('http://213.189.201.63/api/cv/' + this.$route.params.id)
            .then(response => {
              for (let key in response) {
                myResponse[key] = response[key];
              }
            });
        console.log(myResponse);
      } catch (e) {
        alert('Резюме с данным айди не существует');
      }
      console.log(myResponse.data);
      this.status = myResponse.data.status;
      this.first_name = myResponse.data.first_name;
      this.last_name = myResponse.data.last_name;
      this.patronymic = myResponse.data.patronymic;
      this.city = myResponse.data.city;
      this.profession = myResponse.data.profession;
      this.phoneNumber = myResponse.data.phone_number;
      this.photo = myResponse.data.photo;
      this.email = myResponse.data.email;
      this.birthdate = myResponse.data.birthdate;
      this.salary = myResponse.data.salary;
      this.key_skills = myResponse.data.key_skills;
      this.about_me = myResponse.data.about_me;
      this.education = myResponse.data.level_of_education;
      if (this.education === "Среднее") {
        this.toggleEducation = false;
      } else {
        this.toggleEducation = true;
      }
      this.allEducation = myResponse.data.education_information;


      if (Object.hasOwn(myResponse, "data")) {
        this.perem = true;
      } else {
        this.perem = false;
      }
    },
    // Сохранения данных о фио
    inputFIO(first_name, last_name, patronymic) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.patronymic = patronymic;
    },
    // Сохранения данных о фото
    inputFhoto(photo) {
      this.photo = photo;
    },
    // Сохранения данных о профессии
    inputProfession(profession) {
      this.profession = profession;
    },
    // Сохранения данных о номере телефона
    inputPhoneNumber(phoneNumber) {
      this.phoneNumber = phoneNumber;
    },
    // Сохранения данных о имейле
    inputEmail(email) {
      this.email = email;
    },
    // Сохранения данных о ключевых скилах
    inputKeySkills(key_skills) {
      this.key_skills = key_skills;
    },
    // Сохранения данных о "о себе"
    inputAboutMe(about_me) {
      this.about_me = about_me;
    },
    // Сохранения данных о др
    inputBirthdate(birthdate) {
      this.birthdate = birthdate;
    },
    // Сохранения данных о зарплате
    inputSalary(salary) {
      this.salary = salary;
    },
    // Сохранения данных о статусе
    inputStatus(status) {
      this.status = status;
    },
    // Сохранения данных о городе
    inputCity(city) {
      this.city = city;
    },
    // Сохранения данных о айди города
    inputCityId(id_city) {
      this.id_city = id_city;
    },
    //  Обработка ввода данных об образовании
    inputEducation(allEducation) {
      this.allEducation = allEducation;
    },
    // Функция изменения переключателя при вводе уровня образования
    inputSelectEducation(select) {
      this.education = select;
      if (this.education === "Среднее") {
        this.toggleEducation = false;
      } else {
        this.toggleEducation = true;
      }
    },
    // Функция для обновления данных о резюме в бд
    async sendResumeToEdit() {
      let myBody = {};
      myBody.status = this.status;
      myBody.first_name = this.first_name;
      myBody.last_name = this.last_name;
      myBody.patronymic = this.patronymic;
      myBody.city = this.city;
      myBody.photo = this.photo;
      myBody.profession = this.profession;
      myBody.phone_number = this.phoneNumber;
      myBody.email = this.email;
      myBody.birthdate = this.birthdate;
      myBody.level_of_education = this.education;
      myBody.education_information = this.allEducation;
      myBody.salary = this.salary;
      myBody.key_skills = this.key_skills;
      myBody.about_me = this.about_me;

      try {
        await axios
            .post('http://213.189.201.63/api/cv/' + this.$route.params.id + '/edit', JSON.stringify(myBody))
            .then(response => {
              alert('Успешно');
              console.log(response);
            });
      } catch (e) {
        alert('Не удалось обновить резюме');
      }
    }
  },
  watch: {
    '$route.path'() {
      this.proverka();
    }
  },
  mounted() {
    this.proverka();
  }

}
</script>

<style scoped>

</style>