<template>
  <div>
    <v-dialog v-model="mostrarDetalles"
      width="500"
      scrollable
      @click:outside="cerrarDialogo"
    >
      <v-card>
        <v-card-title
          class="headline primary pa-0"
          dark
        >
            <v-toolbar class="primary" dense fixed>
                <v-toolbar-title class="titulo-detalles pl-1">
                    {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
                </v-toolbar-title>
            </v-toolbar>
        </v-card-title>

        <v-card-text>
            {{pokemon.hpBase}}
            {{pokemon.ataqueBase}}
            {{pokemon.defensaBase}}
            <row>
                <v-col v-for="(habilidad, index) of pokemon.habilidades" :key="index">
                    {{habilidad.ability.name}}
                </v-col>
            </row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        mostrarDetalles: {
            type: Boolean,
            default: false,
            required: true,
        },
        pokemon: {
            type: Object,
            required: true,
        },
    },
    data(){
        return { }
    },
    computed: {
        ...mapState('detallesPokemon', 
        [

        ]),
    },
    methods: {
        ...mapActions('detallesPokemon', 
        [
            'cargarEvoluciones'
        ]),
        cerrarDialogo() {
            this.$emit('update:mostrarDetalles', false);
        }
    },
    created(){
        this.cargarEvoluciones(this.pokemon.id);
    }
}
</script>

<style>
    .titulo-detalles{
        font-family: 'Pokemon' !important; 
        -webkit-text-stroke: 2.5px blue !important;
        -webkit-text-fill-color: yellow !important;
        font-size: 50px !important;
    }
</style>