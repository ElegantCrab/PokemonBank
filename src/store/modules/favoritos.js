import * as pokemonAPI from '@/api/pokemon.js';

export default {
    namespaced: true,
    state: {
        idFavoritos: [ ],
        favoritos: [ ],
        cargandoFavoritos: true,
    },
    mutations: {
        agregarUnFavorito(state, accion){
            state.idFavoritos.push(accion);
            localStorage.setItem('favoritos', JSON.stringify(state.idFavoritos));
        },
        removerUnFavorito(state, accion){
            const index = state.idFavoritos.indexOf(accion);
            state.idFavoritos.splice(index, 1);
            state.favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(state.idFavoritos));
        },
        vaciarFavoritos(state, accion){
            state.idFavoritos = accion;
            state.favoritos = accion;
            localStorage.setItem('favoritos', JSON.stringify([]));
        },
        cargarTodosDetallesFavoritos(state, accion){
            state.favoritos = accion;
        },
        cambiarCargandoFavoritos(state, accion){
            state.cargandoFavoritos = accion;
        },
        inicializarFavoritos(state, accion){
            state.idFavoritos = accion;
        }
    },
    actions: {
        async agregarFavoritos({ commit, getters }, id = null){
            if(id) {
                const idFavoritos = getters.obtenerIdFavoritos;
                const favoritosEncontrados = idFavoritos.filter((e) => e === id);
                console.log(idFavoritos);
                if(favoritosEncontrados.length === 0
                    &&
                    idFavoritos.length < 10){
                    commit('agregarUnFavorito', id);
                }
            }
        },
        async removerFavoritos({ commit, getters }, id = null){
            if(id){
                const idFavoritos = getters.obtenerIdFavoritos;
                const favoritosEncontrados = idFavoritos.filter((e) => e == id);
                if(favoritosEncontrados.length !== 0){
                    commit('removerUnFavorito', id);
                }
            }
        },
        async cargarDetallesFavoritos({ commit, getters }){
            commit('cambiarCargandoFavoritos', true);
            const idFavoritos = getters.obtenerIdFavoritos.map((e) => { return { id: e } });
            const resp = await pokemonAPI.obtenerImagenPokemon(idFavoritos);
            console.log("Favoritos!!!!");
            if(resp){
                commit('cargarTodosDetallesFavoritos', resp);
                commit('cambiarCargandoFavoritos', false);
            }
        },
        async inicializarFavoritos({ commit }){
            const idFavoritos = JSON.parse(localStorage.getItem('favoritos'));
            console.log(idFavoritos);
            if(idFavoritos){
                commit
                commit('inicializarFavoritos', idFavoritos);
            }
        },
        async vaciarFavoritos({ commit }){
            commit('vaciarFavoritos', []);
        },
    },
    getters: {
        obtenerIdFavoritos(state) { return state.idFavoritos }
    }
}