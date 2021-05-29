
<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="510"
            scrollable
        >
            <template v-slot:activator="{on, attributes}">
                <v-btn
                    href=""
                    target="_blank"
                    text
                    color="secondary"
                    v-bind="attributes"
                    v-on="on"
                    @click.stop="cargarDetallesFavoritos"
                >
                    <v-icon>
                        star_outline
                    </v-icon>
                </v-btn>
            </template>

            <v-card>

                <v-card-title
                    class="headline primary pa-0"
                >
                    <v-toolbar class="primary" dense fixed>
                        <v-toolbar-title>
                            <v-img 
                                src="https://fontmeme.com/permalink/210527/d9d624c89efedec48f79cf944781974d.png" 
                                alt="pokemon-font" 
                                border="0"
                                max-width="150"
                            ></v-img>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-p>
                            {{numeroFavoritos}}/10
                        </v-p>
                        <v-btn 
                            target="_blank"
                            color="secondary"
                            text
                            @click="vaciarFavoritos()"
                        >
                            <v-icon>delete_forever</v-icon>
                        </v-btn>
                        <!-- <v-btn
                            color="secondary"
                            text
                        >
                            <v-icon>close</v-icon>
                        </v-btn> -->
                    </v-toolbar>
                </v-card-title>

                <v-divider></v-divider>
               
                <v-card-text>
                    <v-row v-if="cargandoFavoritos">
                        <v-col class="mt-5">
                            ...Cargando Detalles
                            <v-text-field loading disabled color="amber"/>
                        </v-col>
                    </v-row>
                    <v-row v-else-if="favoritos.length === 0">
                        <v-col class="mt-5">
                            Lista vacía
                        </v-col>
                    </v-row>
                    <v-row v-else
                        class="pa-5"
                        justify="center"
                    >
                        <v-col cols="6" v-for="(pokemon, index) of favoritos" :key="index">
                            <v-row justify="end">

                            <v-p class="text-h6">
                                {{index+1}}
                            </v-p>
                            <v-btn
                                id="remover-fondo-btn"
                                elevation="0"
                                @click.stop="removerFavoritos(pokemon.id)"
                                >
                                <v-icon
                                    big
                                    absolute
                                    top
                                    center
                                    fab
                                    color="red"
                                    >
                                    star_outline
                                    </v-icon>
                                </v-btn>
                            </v-row>
                            <v-img
                                :src="pokemon.imagen"
                                max-width="200"
                            >
                            </v-img>
                            <v-row justify="center" class="mt-1">
                                <p class="mr-2">
                                    {{index+1}}.-
                                </p>
                                <p class="text-sm-h5 text-md-h4">
                                    {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
                                </p>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: 'Favoritos',
    data(){
        return {
            dialog: false,
        }
    },
    computed: {
        ...mapState('pokeAPI', [
            'pokemonListState'
        ]),
        ...mapState('favoritos', 
        [
            'idFavoritos',
            'favoritos',
            'cargandoFavoritos',
        ]),
        numeroFavoritos(){
            return this.idFavoritos.length
        },
        esNuevoFavorito(){
            let favoritoExistente = [];
            for (const idFav of this.idFavoritos) {
                favoritoExistente.push(this.idFavoritos.filter((id) => id == idFav));
            }
            if(favoritoExistente.length === 0){
              return true;
            }
            return false;
        },
    },
    methods: {
        ...mapActions('favoritos',
        [
            'cargarDetallesFavoritos',
            'removerFavoritos',
            'vaciarFavoritos',
        ]),
        obtenerColorFavorito(esNuevoFavorito){
        if(esNuevoFavorito){
          return 'white';
        }
        return 'yellow';
      }
    },
}
</script>

<style scoped>
    #remover-fondo-btn {
        background-color: transparent !important;
        z-index: 3;
        position: relative;
        color: black;
        max-width: 5px !important;
        min-width: 5px !important;
    }
</style>