<template>
  <!--  Шапка страницы с ссылками-->
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #E7D0B0;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: #484C4F">Резюматор 3000</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/add" class="nav-link active" aria-current="page" style="color: #484C4F">Новое резюме
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--  Блок с отрисовкой страниц в зависимости от ссылки-->
  <div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

div.myBorder {
  border-color: #DFDEDD;
  border-style: solid;
  border-width: 5px;
}

body {
  min-height: 100%;
  background-image: url("../src/assets/theme.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
}

.customAlert {
  padding: 0;
  width: fit-content;
  margin-bottom: unset;
}

.col {
  min-height: 500px;
}

div.myBorderEducation {
  border-color: #EAD5B6;
  border-style: solid;
  border-width: 5px;
}

</style>