import * as pokemonAPI from '@/api/pokemon.js';

export default {
    namespaced: true,
    state: {
        pokemonListState: [],
        busquedaPokemon: [],
        urlPaginaSiguiente: '',
        urlPaginaAnterior: '',
        buscando: false,
        cargando: true
    },
    mutations: {
        llenarPokemonListState(state, accion){
            state.pokemonListState = accion;
        },
        llenarBusquedaPokemon(state, accion){
            state.busquedaPokemon = accion;
        },
        assignarUrlSiguiente(state, accion){
            state.urlPaginaSiguiente = accion;
        },
        assignarUrlAnterior(state, accion){
            state.urlPaginaAnterior = accion;
        },
        cambiarCargarEstado(state, accion){
            state.cargando = accion;
        }
    },
    actions: {
        async obtenerPokemon({ commit }, url = null){
            var resp;
            commit('cambiarCargarEstado', true);
            if(url){
                resp = await pokemonAPI.cargarPaginaPokemon(url);
            } else {
                resp = await pokemonAPI.obtenerPokemons();
            }
            let pokemonList = await pokemonAPI.obtenerImagenPokemon(resp.data.results);
            let urlAnterior = resp.data.previous;
            let urlSiguiente = resp.data.next;
            commit('llenarPokemonListState', pokemonList);
            commit('assignarUrlSiguiente', urlSiguiente);
            commit('assignarUrlAnterior', urlAnterior);
            commit('cambiarCargarEstado', false);
        },
        async buscarPokemon({ commit, dispatch, getters }, query = null){
            commit('cambiarCargarEstado', true);

            let pokeLista = getters.obtenerBusquedaPokemon;

            if(pokeLista.length === 0){
                const resp = await pokemonAPI.obtenerTodosPokemon();
                pokeLista = resp.data.results;
                commit('llenarBusquedaPokemon', pokeLista);
            }

            if(query.length === 0){
                dispatch('obtenerPokemon');
                return;
            }

            if(query && pokeLista){
                const resultado = pokeLista.filter((e) => e.name.toUpperCase().includes(query.toUpperCase()));
                if(resultado){
                    let pokemonList = await pokemonAPI.obtenerImagenPokemon(resultado);
                    commit('llenarPokemonListState', pokemonList);
                    commit('cambiarCargarEstado', false);
                    return;
                }
            }
            commit('llenarPokemonListState', []);
            commit('cambiarCargarEstado', false);
        },
        async encontrarPokemonPorInicial({ commit, dispatch, getters }, letra = null){
            commit('cambiarCargarEstado', true);
            let pokeLista = getters.obtenerBusquedaPokemon;
            if(pokeLista.length === 0){
                console.log("PETITION");
                const resp = await pokemonAPI.obtenerTodosPokemon();
                pokeLista = resp.data.results;
                commit('llenarBusquedaPokemon', pokeLista);
            }
            if(letra.length === 0){
                dispatch('obtenerPokemon');
                return;
            }
            console.log('OBTENIENDO POR INICIAL');
            if(pokeLista){
                const resultado = pokeLista.filter((e) => e.name.toUpperCase().startsWith(letra.toUpperCase()));
                let pokemonList = await pokemonAPI.obtenerImagenPokemon(resultado);
                console.log("TERMINO!");
                commit('llenarPokemonListState', pokemonList);
                commit('cambiarCargarEstado', false);
                console.log('Actualizado!!')
                return;
            }
            commit('llenarPokemonListState', []);
            commit('cambiarCargarEstado', false);
        }
    },
    getters: {
        obtenerPokemons(state){ return state.pokemonListState; },
        obtenerImagenesFondos(state){ return state.imagenesFondos; },
        obtenerSiguienteUrl(state){ return state.urlSiguiente; },
        obtenerBusquedaPokemon(state) { return state.busquedaPokemon; },
    }
}