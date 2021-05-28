import * as pokemonAPI from '@/api/pokemon.js';

export default {
    namespaced: true,
    state: {
        evoluciones: null,
        cargandoEvoluciones: true,
    },
    mutations: {
        llenarEvoluciones(state, accion){
            state.evoluciones = accion;
        },
        cambiarCargandoEvoluciones(state, accion){
            state.cargandoEvoluciones = accion;
        }
    },
    actions: {
        async cargarEvoluciones({ commit }, especieUrl = ""){
            commit('cambiarCargandoEvoluciones', true);
            const evoluciones = await pokemonAPI.obtenerEvolucionesPorEspecie(especieUrl);
            commit('llenarEvoluciones', evoluciones);
            commit('cambiarCargandoEvoluciones', false);
        }
    },
    getters: {

    }
}