<template>
  <div class="container">
    <header class=" home-logo-color">
      <a class="navbar-brand head-logo"  @click.prevent href="#">
          <img class="head-img" src="../img/icon-left-font-monochrome-white1.png" alt="header logo groupomania "><h3 class="font-weight-bold"></h3>
        </a>
      <!-- <h3>{{content}}</h3> -->
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style>
.home-logo-color{
 width: 100%; 
 text-align: center;
 background-color:#091f43;
 margin-bottom: 250px;
}
.home-logo-color img{
 width: 50vw;
 height: 10vw;
}

</style>
