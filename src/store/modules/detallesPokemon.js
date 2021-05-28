import * as pokemonAPI from '@/api/pokemon.js';

export default {
    namespaced: true,
    state: {
        evoluciones: [],
        cargando: true,
    },
    mutations: {
        llenarEvoluciones(state, accion){
            state.evoluciones = accion;
        }
    },
    actions: {
        async cargarEvoluciones({ commit }, id = 0){
            const resp = await pokemonAPI.obtenerEvolucionesPorId(id);

            

            commit('llenarEvoluciones', resp.data)
        }
    },
    getters: {

    }
}