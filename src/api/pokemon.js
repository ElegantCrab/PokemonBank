import axios from 'axios';

const urlFondos = 'https://www.gameovercancer.ca/backgrounds/';
const obtenerPokemonString = 'pokemon/';
const obtenerEvolucionesString = "evolution-chain/";

export const obtenerTodosPokemon = async () => {
    const pokeLista = await axios.get(obtenerPokemonString+"?limit=1118");
    return pokeLista;
}

export const obtenerPokemons = async () => {
    const pokemonLista = await axios.get(obtenerPokemonString);
    return pokemonLista;
}

//Puede ser id o nombre del pokemon tal y como lo menciona la pokeAPI
export const obtenerPokemon = async (string) => {
    const fullUrl = obtenerPokemonString + string;
    const resp = await axios.get(fullUrl);
    return resp;
}

export const obtenerImagenPokemon = async (pokemonLista) => {
    let pokemonNuevaLista = pokemonLista;
    for (const i in pokemonLista) {
        const pokemonInfo = await obtenerPokemon(pokemonLista[i].name);
        if(pokemonInfo){
            pokemonNuevaLista[i].id = pokemonInfo.data.id;
            pokemonNuevaLista[i].hpBase = pokemonInfo.data.stats[0].base_stat;
            pokemonNuevaLista[i].ataqueBase = pokemonInfo.data.stats[1].base_stat;
            pokemonNuevaLista[i].defensaBase = pokemonInfo.data.stats[2].base_stat;
            pokemonNuevaLista[i].imagen = pokemonInfo.data.sprites.front_default;
            pokemonNuevaLista[i].habilidades = pokemonInfo.data.abilities;
            pokemonNuevaLista[i].peso = pokemonInfo.data.weight;
            pokemonNuevaLista[i].altura = pokemonInfo.data.height;
            pokemonNuevaLista[i].tipos = pokemonInfo.data.types;
            const tipos = pokemonLista[i].tipos.map((e) => e.type.name);
            pokemonLista[i].imagenFondo = `${urlFondos}${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)}.png`;
            if(tipos[0] === 'normal'){
                if(tipos[1]) pokemonLista[i].imagenFondo = `${urlFondos}${tipos[1].charAt(0).toUpperCase() + tipos[1].slice(1)}.png`;
            }
        }
    }
    return pokemonNuevaLista;
}

export const cargarPaginaPokemon = async (url) => {
    const pokeLista = await axios.get(url);
    return pokeLista;
}

export const obtenerEvolucionesPorId = async (id) => {
    const resp = await axios.get(obtenerEvolucionesString + id);

    const evoluciones = resp.data;

    const result = depthFirst(node => node.evolves_to)(evoluciones.chain)
    .map(({species}) => species.name);

    console.log(result);

    return result;
}

const depthFirst = (getChildren) => (node) => {
  return [
    node, 
    ... (getChildren(node) || []).flatMap(depthFirst(getChildren)),
  ]
}