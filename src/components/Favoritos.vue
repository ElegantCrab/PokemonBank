
<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500"
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
                        <v-btn 
                            target="_blank"
                            color="secondary"
                            text
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
                    <v-row v-for="(pokemon, index) of pokemonListState" :key="index"
                        class="pa-5"
                    >
                        <v-col cols="12">
                            <v-avatar>
                                <v-icon>
                                    star
                                </v-icon>
                            </v-avatar>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";

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
            'favoritos'
        ]),
    },
    methods: {

    },
}
</script>

<style scoped>
    
</style>