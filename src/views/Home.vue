<template>
  <v-container>
    <v-row class="pt-10 justify-space-between">
      <div v-if="!buscando && urlPaginaAnterior">
        <v-btn @click="obtenerPokemon(urlPaginaAnterior)">
        <span>&#8592;</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn style="visibility: hidden"/>
      </div>
      <v-spacer>
        <v-text-field
          class="pl-16 pr-16 pt-1 mt-0"
          solo
          label="Buscar Pokemon"
          prepend-inner-icon="search"
          clearable
          @click:clear="obtenerPokemon()"
          @keyup.native.enter="buscarPokemon(busquedaPokemon)"
          v-model="busquedaPokemon"
        />
      </v-spacer>
      <div v-if="!buscando">
        <v-btn v-if="urlPaginaSiguiente" @click="obtenerPokemon(urlPaginaSiguiente)">
          <span>&#8594;</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn style="visibility: hidden"/>
      </div>
    </v-row>

    <v-row>
      <v-col cols="2" md="1" sm="2" v-for="(letra, index) of alfabeto" :key="index">
        <v-btn @click="encontrarPokemonPorInicial(letra)">
          {{letra}}
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="pt-5">
      <v-col v-if="cargando" cols="12" align="center">
        <v-text-field loading disabled color="amber"/>
      </v-col>
      <v-col v-if="pokemonListState.length === 0 && !cargando" cols="12">
        <h1>Pokémons no encontrados!</h1>
      </v-col>
      <v-col v-else cols="12" sm="6" md="4" lg="3" v-for="(pokemon, index) of pokemonListState" :key="index">
        <TarjetaPokemon :pokemon="pokemon"/>
      </v-col>
      <v-spacer/>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import TarjetaPokemon from '@/components/TarjetaPokemon.vue';

  export default {
    name: 'Home',
    data() {
      return {
        busquedaPokemon: '',
      }
    },
    computed: {
      ...mapState('pokeAPI', 
      [
        'pokemonListState', 
        'urlPaginaSiguiente',
        'urlPaginaAnterior',
        'cargando'
      ]),
      buscando(){
        if(this.busquedaPokemon && this.busquedaPokemon !== " "){
          return true;
        }
        return false;
      },
      alfabeto(){
        return 'abcdefghijklmnopqrstuvwxyz'.split('');
      }
    },
    methods: {
      ...mapActions('pokeAPI', 
      [
        'obtenerPokemon',
        'buscarPokemon',
        'encontrarPokemonPorInicial'
      ]),
    },
    created(){
      this.obtenerPokemon();
    },
    components: {
      TarjetaPokemon
    }
  }
</script>

<style scoped>

</style>