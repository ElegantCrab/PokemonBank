<template>
  <div>
    <v-dialog v-model="mostrarDetalles"
      width="400"
      scrollable
      @click:outside="cerrarDialogo"
    >
      <v-card>
        <v-card-title
          class="headline primary pa-0"
          dark
        >
            <v-toolbar class="primary" dense fixed>
                <v-spacer></v-spacer>
                <v-toolbar-title class="titulo-detalles pl-1 pr-1">
                    {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </v-card-title>

        <v-card-text align="center">
            <v-img class="imagen-pokemon"
                :src="pokemon.imagen"
                max-height="200"
                max-width="200"
            />
            <v-row class="pt-5">
                <v-spacer></v-spacer>
                <div class="pa-3 success rounded-circle d-inline-block" style="color:white; font-weight: 500;">HP {{pokemon.hpBase}}</div>
                <!-- <span style="color: green; font-weight: 500">HP {{pokemon.hpBase}}</span> -->
                <v-spacer></v-spacer>
                <div class="pa-3 error rounded-circle d-inline-block" style="color:white; font-weight: 500;">ATK {{pokemon.ataqueBase}}</div>
                <!-- <span style="color: red; font-weight: 500">ATK {{pokemon.ataqueBase}}</span> -->
                <v-spacer></v-spacer>
                <div class="pa-3 accent rounded-circle d-inline-block" style="color:white; font-weight: 500;">DEF {{pokemon.defensaBase}}</div>
                <!-- <span style="color: DodgerBlue; font-weight: 500">DEF {{pokemon.defensaBase}}</span> -->
                <v-spacer></v-spacer>
            </v-row>
            <!-- <v-cols class="pt-16">
                <v-row class="pt-2">
                </v-row>
                <v-row class="pt-2">
                </v-row>
                <v-row class="pt-2">
                </v-row>
            </v-cols> -->
            <!-- <v-row justify="center">
            </v-row> -->

            <v-row justify="center" class="pt-6" style="font-weight: 700;">
                HABILIDADES
            </v-row>
            <v-row>
                <v-col style="text-transform: capitalize; font-weight: 500;" v-for="(habilidad, index) of pokemon.habilidades" :key="index">
                    {{habilidad.ability.name.replace(/-/g, ' ')}}
                </v-col>
            </v-row>
            
            <v-row justify="center" class="pt-6" style="font-weight: 700;">
                LINEA DE EVOLUCIÓN
            </v-row>
            <v-row v-if="!cargandoEvoluciones">
                <v-col style="text-transform: capitalize" v-for="(evolucion, index) of evoluciones" :key="index">
                    <div v-if="evolucion">
                        <v-img
                            :src="evolucion.imagen"
                            max-width="50"
                        >

                        </v-img>
                        {{evolucion.nombre.replace(/-/g, ' ')}}
                    </div>
                    <div v-else>
                        NO DISPONIBLE
                    </div>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col>
                    <v-progress-circular
                      indeterminate
                      color="blue"
                    ></v-progress-circular>
                    Cargando Evoluciones...
                </v-col>
            </v-row>
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
            'evoluciones',
            'cargandoEvoluciones'
        ]),
    },
    methods: {
        ...mapActions('detallesPokemon', 
        [
            'cargarEvoluciones',
        ]),
        cerrarDialogo() {
            this.$emit('update:mostrarDetalles', false);
        },
    },
    watch: {
        mostrarDetalles(){
           if(this.mostrarDetalles){
               this.cargarEvoluciones(this.pokemon.especieUrl);
           }
        }
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