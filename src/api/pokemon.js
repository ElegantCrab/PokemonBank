import axios from 'axios';

const urlFondos = 'https://www.gameovercancer.ca/backgrounds/';
const obtenerPokemonString = 'pokemon/';
// const obtenerEvolucionesString = "evolution-chain/";

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
    // const result = await axios.all(pokemonLista.map(x => axios.get(obtenerPokemonString + x.name)));
    // result.forEach((resp, i) => {
    //     if(resp.status === 200){
    //         pokemonNuevaLista[i].id = resp.data.id;
    //         pokemonNuevaLista[i].hpBase = resp.data.stats[0].base_stat;
    //         pokemonNuevaLista[i].ataqueBase = resp.data.stats[1].base_stat;
    //         pokemonNuevaLista[i].defensaBase = resp.data.stats[2].base_stat;
    //         pokemonNuevaLista[i].imagen = resp.data.sprites.front_default;
    //         pokemonNuevaLista[i].habilidades = resp.data.abilities;
    //         pokemonNuevaLista[i].especieUrl = resp.data.species.url;
    //         pokemonNuevaLista[i].peso = resp.data.weight;
    //         pokemonNuevaLista[i].altura = resp.data.height;
    //         pokemonNuevaLista[i].tipos = resp.data.types;
    //         const tipos = pokemonLista[i].tipos.map((e) => e.type.name);
    //         pokemonLista[i].imagenFondo = `${urlFondos}${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)}.png`;
    //         if(tipos[0] === 'normal'){
    //             if(tipos[1]) pokemonLista[i].imagenFondo = `${urlFondos}${tipos[1].charAt(0).toUpperCase() + tipos[1].slice(1)}.png`;
    //         }
    //     }
    // });
    // .then(axios.spread((...resp) => {
    //    resp.forEach((resp, i) => {
           
    //        if(resp.status === 200){
    //            pokemonNuevaLista[i].id = resp.data.id;
    //            pokemonNuevaLista[i].hpBase = resp.data.stats[0].base_stat;
    //            pokemonNuevaLista[i].ataqueBase = resp.data.stats[1].base_stat;
    //            pokemonNuevaLista[i].defensaBase = resp.data.stats[2].base_stat;
    //            pokemonNuevaLista[i].imagen = resp.data.sprites.front_default;
    //            pokemonNuevaLista[i].habilidades = resp.data.abilities;
    //            pokemonNuevaLista[i].especieUrl = resp.data.species.url;
    //            pokemonNuevaLista[i].peso = resp.data.weight;
    //            pokemonNuevaLista[i].altura = resp.data.height;
    //            pokemonNuevaLista[i].tipos = resp.data.types;
    //            const tipos = pokemonLista[i].tipos.map((e) => e.type.name);
    //            pokemonLista[i].imagenFondo = `${urlFondos}${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)}.png`;
    //            if(tipos[0] === 'normal'){
    //                if(tipos[1]) pokemonLista[i].imagenFondo = `${urlFondos}${tipos[1].charAt(0).toUpperCase() + tipos[1].slice(1)}.png`;
    //            }
    //        }
    //    });
    // }));

    console.log("DONE!");

    //! TARDA UN POCO PERO CORRE LA APLICACION NORMALMENTE SIN CONGELACIONES
    for (const i in pokemonLista) {
        const pokemonInfo = await obtenerPokemon(pokemonLista[i].name);
        if(pokemonInfo){
            pokemonNuevaLista[i].id = pokemonInfo.data.id;
            pokemonNuevaLista[i].hpBase = pokemonInfo.data.stats[0].base_stat;
            pokemonNuevaLista[i].ataqueBase = pokemonInfo.data.stats[1].base_stat;
            pokemonNuevaLista[i].defensaBase = pokemonInfo.data.stats[2].base_stat;
            pokemonNuevaLista[i].imagen = pokemonInfo.data.sprites.front_default;
            pokemonNuevaLista[i].habilidades = pokemonInfo.data.abilities;
            pokemonNuevaLista[i].especieUrl = pokemonInfo.data.species.url;
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

export const obtenerEvolucionesPorEspecie = async (especieUrl) => {
    const especieInfo = await axios.get(especieUrl);

    const resp = await axios.get(especieInfo.data.evolution_chain.url);
    console.log('GETTING EVOLUTION');
    if(resp.status === 200){
        const evoluciones = resp.data;

        const result = depthFirst(node => node.evolves_to)(evoluciones.chain)
        .map(async ({species}) => {
            const resp = await obtenerPokemon(species.name);
            console.log(resp);
            return {
                name: species.name,
                imagen: resp.data.sprites.front_default
            }
        });
        if(result){
            console.log(result);
            return result;
        }
    }

    return;
}

const depthFirst = (getChildren) => (node) => {
  return [
    node, 
    ... (getChildren(node) || []).flatMap(depthFirst(getChildren)),
  ]
}