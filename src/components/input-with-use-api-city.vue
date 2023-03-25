<template>
<!--  Ввод города-->
  <div class="input-group mt-3">
    <span class="input-group-text">Город</span>
    <input
        v-bind:value="city"
        @input="inputCity"
        class="form-control" list="datalistOptions" placeholder="Город" aria-label="Город">
    <datalist id="datalistOptions">
      <option v-for="city in cities" :key="city.id" :value="[city.id , city.title]">
        {{
          city.title
        }}
      </option>
    </datalist>
  </div>
  <div
      v-if="error_city"
      class="alert alert-danger customAlert" role="alert">
    Город не соответствует формату
  </div>
</template>

<script>
import {jsonp} from "vue-jsonp";

export default {
  name: "input-with-use-api-city",
  props: [
      "cityProps"
  ],
  data() {
    return {
      cities: [],
      error_city: "",
      url_city_begin: "https://api.vk.com/method/database.getCities?access_token=",
      token: process.env.VUE_APP_TOKEN,
      url_city_end: "&country_id=1&v=5.131&q=",
      city: "",
      id_city: "",
    }
  },
  methods: {
    // Обработка ввода города
    inputCity(event) {
      let str = event.target.value;

      if (str.includes(',')) {
        let arrayStr = str.split(',');
        this.id_city = arrayStr[0];
        this.city = arrayStr[1];
      } else {
        this.id_city = "";
        this.city = str;
      }

      let regexp = /^[А-Яа-я][А-Яа-я \-()/.]{2,40}/gmu;

      let result = this.city.match(regexp);

      if ((result !== null)) {
        if (result[0] === this.city) {
          this.error_city = false;
        } else {
          this.error_city = true;
        }
      } else {
        this.error_city = true;
      }
      if (this.city === "") {
        this.error_city = false;
      }

      this.getCity();
      this.$emit('getIdCity', this.id_city);
      this.$emit('getData', this.city);
    },
    // Получение списка городов с помощью апи
    getCity() {
      jsonp(this.url_city_begin + this.token + this.url_city_end + this.city)
          .then(response => {
            this.cities = response.response.items;
          })
    },
    getCityFromProps(value) {
      this.city = value;
    }
  },
  mounted() {
    this.getCity();
    this.getCityFromProps(this.$props.cityProps);
  }
}
</script>

<style scoped>

</style>