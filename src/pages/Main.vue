<template>
  <!--  Главная страница-->
  <div class="container-fluid">
    <div class="row">
      <!--      Вывод резюме в соответсвии с их статусом-->
      <div class="col text-center">
        <h3>
          Новый ( {{ this.statusNew.length }} )
        </h3>
        <draggable
            class="list-group"
            :list="statusNew"
            @change="log1"
            itemKey="id"
            group="resume"
        >
          <!--          Кликая по всему тексту в блоке можно перейти на соответсвующую страницу и редактировать резюме -->
          <template #item="{ element }">
            <div class="card mb-3" style="background-color: #DFDEDD; border-color: #E7D0B0; border-width: 5px;"
                 @click="$router.push('/edit/' + element.id)">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="element.photo" class="img-fluid rounded-start"
                       alt="Ваше фото">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ element.last_name }} {{ element.first_name }} {{ element.patronymic }}
                    </h5>
                    <p class="card-text">{{ element.profession }}, {{ element.age }} лет</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="col text-center">
        <h3>
          Назначено собеседование ( {{ this.statusInterviewScheduled.length }} )
        </h3>
        <draggable
            class="list-group"
            :list="statusInterviewScheduled"
            @change="log2"
            itemKey="id"
            group="resume"
        >
          <template #item="{ element }">
            <div class="card mb-3" style="background-color: #DFDEDD; border-color: #E7D0B0; border-width: 5px;"
                 @click="$router.push('/edit/' + element.id)">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="element.photo" class="img-fluid rounded-start"
                       alt="Ваше фото">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ element.last_name }} {{ element.first_name }} {{ element.patronymic }}
                    </h5>
                    <p class="card-text">{{ element.profession }}, {{ element.age }} лет</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="col text-center">
        <h3>
          Принят ( {{ this.statusAccepted.length }} )
        </h3>
        <draggable
            class="list-group"
            :list="statusAccepted"
            @change="log3"
            itemKey="id"
            group="resume"
        >
          <template #item="{ element }">
            <div class="card mb-3" style="background-color: #DFDEDD; border-color: #E7D0B0; border-width: 5px;"
                 @click="$router.push('/edit/' + element.id)">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="element.photo" class="img-fluid rounded-start"
                       alt="Ваше фото">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ element.last_name }} {{ element.first_name }} {{ element.patronymic }}
                    </h5>
                    <p class="card-text">{{ element.profession }}, {{ element.age }} лет</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
      <div class="col text-center">
        <h3>
          Отказ ( {{ this.statusRefusal.length }} )
        </h3>
        <draggable
            class="list-group"
            :list="statusRefusal"
            @change="log4"
            itemKey="id"
            group="resume"
        >
          <template #item="{ element }">
            <div class="card mb-3" style="background-color: #DFDEDD; border-color: #E7D0B0; border-width: 5px;"
                 @click="$router.push('/edit/' + element.id)">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="element.photo" class="img-fluid rounded-start"
                       alt="Ваше фото">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ element.last_name }} {{ element.first_name }} {{ element.patronymic }}
                    </h5>
                    <p class="card-text">{{ element.profession }}, {{ element.age }} лет</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    draggable,
  },
  data() {
    return {
      statusNew: [],
      statusInterviewScheduled: [],
      statusAccepted: [],
      statusRefusal: [],
    }
  },
  methods: {
    // Функция для получения всех резюме с бд
    async getAllResumes() {
      let allResumes = [];

      try {
        await axios
            .get('http://213.189.201.63/api/cv')
            .then(response => {
              allResumes = response.data;
            });
      } catch (e) {
        alert('Не удалось получить список резюме');
      }

      let statusNew = [];
      let statusInterviewScheduled = [];
      let statusAccepted = [];
      let statusRefusal = [];

      if (allResumes != []) {
        allResumes.forEach(function (item) {
          let obj = {};
          if (item.status == "Новый") {
            obj.id = item.id;
            obj.status = item.status;
            obj.photo = item.photo;
            obj.profession = item.profession;
            obj.first_name = item.first_name;
            obj.last_name = item.last_name;
            obj.patronymic = item.patronymic;

            let today = new Date();
            let date_array = item.birthdate.split('-');
            let birtdate = new Date(date_array[0], date_array[1], date_array[2]);

            obj.age = today.getFullYear() - birtdate.getFullYear();

            if (today.getMonth() <= birtdate.getMonth()) {
              if (today.getDate() < birtdate.getDate()) {
                obj.age = obj.age - 1;
              }
            }

            statusNew.push(obj);
          } else if (item.status == "Назначено собеседование") {
            obj.id = item.id;
            obj.status = item.status;
            obj.photo = item.photo;
            obj.profession = item.profession;
            obj.first_name = item.first_name;
            obj.last_name = item.last_name;
            obj.patronymic = item.patronymic;

            let today = new Date();
            let date_array = item.birthdate.split('-');
            let birtdate = new Date(date_array[0], date_array[1], date_array[2]);

            obj.age = today.getFullYear() - birtdate.getFullYear();

            if (today.getMonth() <= birtdate.getMonth()) {
              if (today.getDate() < birtdate.getDate()) {
                obj.age = obj.age - 1;
              }
            }

            statusInterviewScheduled.push(obj);
          } else if (item.status == "Принят") {
            obj.id = item.id;
            obj.status = item.status;
            obj.photo = item.photo;
            obj.profession = item.profession;
            obj.first_name = item.first_name;
            obj.last_name = item.last_name;
            obj.patronymic = item.patronymic;

            let today = new Date();
            let date_array = item.birthdate.split('-');
            let birtdate = new Date(date_array[0], date_array[1], date_array[2]);

            obj.age = today.getFullYear() - birtdate.getFullYear();

            if (today.getMonth() <= birtdate.getMonth()) {
              if (today.getDate() < birtdate.getDate()) {
                obj.age = obj.age - 1;
              }
            }

            statusAccepted.push(obj);
          } else if (item.status == "Отказ") {
            obj.id = item.id;
            obj.status = item.status;
            obj.photo = item.photo;
            obj.profession = item.profession;
            obj.first_name = item.first_name;
            obj.last_name = item.last_name;
            obj.patronymic = item.patronymic;

            let today = new Date();
            let date_array = item.birthdate.split('-');
            let birtdate = new Date(date_array[0], date_array[1], date_array[2]);

            obj.age = today.getFullYear() - birtdate.getFullYear();

            if (today.getMonth() <= birtdate.getMonth()) {
              if (today.getDate() < birtdate.getDate()) {
                obj.age = obj.age - 1;
              }
            }

            statusRefusal.push(obj);
          }
        });

        this.statusNew = statusNew;
        this.statusInterviewScheduled = statusInterviewScheduled;
        this.statusAccepted = statusAccepted;
        this.statusRefusal = statusRefusal;
      }
    },
    // Функция для обновления статуса резюме
    async updateStatus(id, status) {
      let myBody = {};
      myBody.status = status;
      try {
        await axios
            .post('http://213.189.201.63/api/cv/' + id + '/status/update', JSON.stringify(myBody))
            .then(response => {
              console.log(response);
            });
      } catch (e) {
        alert('Не удалось обновить статус резюме');
      }
    },
    // Функция для прослушки изменений в 1 блоке с "Новыми" резюме
    log1: async function (evt) {
      console.log("log1");
      window.console.log(evt);
      console.log(Object.prototype.hasOwnProperty.call(evt, "added"));

      if (Object.prototype.hasOwnProperty.call(evt, "added")) {
        window.localStorage.setItem('add', JSON.stringify(evt));
        let vrem = JSON.parse(window.localStorage.getItem('add'));

        this.updateStatus(vrem.added.element.id, "Новый");
        window.localStorage.removeItem('add');
      }
    },
    // Функция для прослушки изменений во 2 блоке с "Назначено собеседование" резюме
    log2: function (evt) {
      console.log("log2");
      window.console.log(evt);
      console.log(Object.prototype.hasOwnProperty.call(evt, "added"));

      if (Object.prototype.hasOwnProperty.call(evt, "added")) {
        window.localStorage.setItem('add', JSON.stringify(evt));
        let vrem = JSON.parse(window.localStorage.getItem('add'));

        this.updateStatus(vrem.added.element.id, "Назначено собеседование");
        window.localStorage.removeItem('add');
      }
    },
    // Функция для прослушки изменений в 3 блоке с "Принятыми" резюме
    log3: function (evt) {
      console.log("log3");
      window.console.log(evt);
      console.log(Object.prototype.hasOwnProperty.call(evt, "added"));

      if (Object.prototype.hasOwnProperty.call(evt, "added")) {
        window.localStorage.setItem('add', JSON.stringify(evt));
        let vrem = JSON.parse(window.localStorage.getItem('add'));

        this.updateStatus(vrem.added.element.id, "Принят");
        window.localStorage.removeItem('add');
      }
    },
    // Функция для прослушки изменений в 4 блоке с "Отказанными" резюме
    log4: function (evt) {
      console.log("log4");
      window.console.log(evt);
      console.log(Object.prototype.hasOwnProperty.call(evt, "added"));

      if (Object.prototype.hasOwnProperty.call(evt, "added")) {
        window.localStorage.setItem('add', JSON.stringify(evt));
        let vrem = JSON.parse(window.localStorage.getItem('add'));

        this.updateStatus(vrem.added.element.id, "Отказ");
        window.localStorage.removeItem('add');
      }
    },
  },
  mounted() {
    this.getAllResumes();
  },
}
</script>

<style scoped>

</style>