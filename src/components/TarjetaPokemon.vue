<template>
   <div>
      <DetallesPokemon :mostrarDetalles.sync="mostrarDetalles" :pokemon="pokemon"/>
       <v-card 
          elevation="3"
          align="center"
          class="v-card mt-8"
          @click.stop="mostrarDetalles=true"
        >
          <v-row 
            justify="end"
            class="pr-6"
          >
            <v-btn
              id="remover-fondo-btn"
              elevation="0"
              @click.stop="esNuevoFavorito ? agregarFavoritos(pokemon.id) : removerFavoritos(pokemon.id)"
            >
              <v-icon
                  big
                  absolute
                  top
                  center
                  fab
                  :color="obtenerColorFavorito(esNuevoFavorito)"
                >
                  star_outline
                </v-icon>
              </v-btn>
          </v-row>
        <div class="fluid fill-height">
          <v-img
            :src="pokemon.imagenFondo"
            class="estilo-header pa-5"
            max-height="190"
          >
          </v-img>
          <v-img class="imagen-pokemon"
            :src="pokemon.imagen"
            max-height="200"
            max-width="200"
          />
        </div>

        <v-row no-gutters class="pa-3 mb-4 tipos">
          <v-col v-for="(tipo, index) of pokemon.tipos" :key="index">
            <v-chip
              label
              :color="tiposColores[`${tipo.type.name}`]"
              text-color="white"
            >
            {{tipo.type.name.toUpperCase()}}
            </v-chip>
          </v-col>
        </v-row>
        <v-card-title class="text-h5 justify-center nombre-pokemon">
          <v-row no-gutters>
            <v-col cols="12">
              {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
            </v-col>
          </v-row>
          <span>
          </span>
        </v-card-title>
        <v-row class="ataque-hp">
          <v-col>
            <v-card-subtitle class="pl-0 pb-0 float">
              HP {{pokemon.hpBase}}
            </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-subtitle class="pl-2 pr-0 pb-0 float">
              ATK {{pokemon.ataqueBase}}
            </v-card-subtitle>
          </v-col>
        </v-row>
        </v-card>
    </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DetallesPokemon from '@/components/DetallesPokemon.vue';

export default {
    name: 'TarjetaPokemon',
    props: {
        pokemon: Object
    },
    data(){
        return {
          mostrarDetalles: false,
          tiposColores: {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
          },
        }
    },
    computed: {
      ...mapState('favoritos', 
      [
        'idFavoritos',
        'favoritos'
      ]),
      esNuevoFavorito(){
        const favoritoExistente = this.idFavoritos.filter((id) => id == this.pokemon.id);
        console.log(favoritoExistente);
        if(favoritoExistente.length === 0){
          return true;
        }
        return false;
      },
    },
    methods: {
      ...mapActions('favoritos',
      [
        'agregarFavoritos',
        'removerFavoritos',
        'limpiarFavoritos'
      ]),
      obtenerColorFavorito(esNuevoFavorito){
        if(esNuevoFavorito){
          return 'white';
        }
        return 'yellow';
      }
    },
    components: {
      DetallesPokemon
    }
}
</script>

<style scoped>
  .imagen-pokemon {
    border: 5px solid white;
    border-radius: 50%;
    margin-top: -145px;
    background-color: white;
    z-index: -1;
  }
  .estilo-header {
    width: 100%;
    z-index: -1;
  }
  .v-card {
    z-index: 1;
  }
  .nombre-pokemon {
    margin-top: -25px;
    z-index: 2;
  }
  .tipos {
    margin-top: -1rem !important;
  }
  .ataque-hp {
    margin-top: -2.8rem;
  }
  #remover-fondo-btn::before {
    background-color: transparent !important;
  }
  #remover-fondo-btn {
    background-color: transparent !important;
    z-index: 3;
    position: relative;
    color: black;
    line-height: 0px;
    position: absolute;
    margin-top: 5px;
    margin-left: 0px;
    margin-right:0px;
    max-width: 5px !important;
    min-width: 5px !important;
  }
</style>