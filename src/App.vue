<template>
  <v-app>
    <link href="//db.onlinewebfonts.com/c/a222402127a0453c817a6cf4c3d9810b?family=Pokemon" rel="stylesheet" type="text/css"/>
    <v-app-bar
      app
      color="primary"
      dark
      v-if="logged"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Pokeball"
          class="shrink mr-2"
          contain
          src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Pokemon Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>      
      <img src="https://fontmeme.com/permalink/210526/bbd2bec08a777853e5e9570733f95314.png" alt="pokemon-font" border="0">
      <v-spacer></v-spacer>
      <Favoritos class="mr-2" />
      <v-btn
        href=""
        target="_blank"
        text
        color="secondary"
      >
        <span class="mr-2"></span>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Favoritos from '@/components/Favoritos.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({  }),
  components: {
    Favoritos,
  },
  computed: {
     logged(){
         return true;
     }
  },
  methods: {
    ...mapActions('favoritos', 
    [
      'inicializarFavoritos'
    ]),
  },
  beforeMount(){
    this.inicializarFavoritos();
  }
};
</script>

<style>
  h1 {
    font-family: 'Pokemon';
    font-weight: normal;
    font-size: 3rem;
  }
</style>
