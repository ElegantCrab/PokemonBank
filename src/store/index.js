import Vue from 'vue'
import Vuex from 'vuex'

import pokeAPI from './modules/pokeMain.js';
import favoritos from './modules/favoritos.js';
import detallesPokemon from './modules/detallesPokemon.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pokeAPI,
    favoritos,
    detallesPokemon,
  }
});
