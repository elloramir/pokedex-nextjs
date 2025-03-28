// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import React, { createContext, useState, useContext, useEffect, useRef } from "react";


const Context = createContext(undefined);


export function PokemonsProvider({ children }) {
	const [loadedPokemons, setLoadedPokemons] = useState([]);
	
	// Query bucked pokemons
	function queryPokemons(from = 0, to = 32) {
		return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${to}&offset=${from}`)
			.then(resp => resp.json())
			.then(async (data) => {
				const pokemonDetailsPromises = data.results.map(pokemon => 
					fetch(pokemon.url)
						.then(resp => resp.json())
						.then(props => ({
							id: props.id,
							name: props.name,
							number: props.id,
							image: props.sprites.front_default + "?v=1", // Activate cache
							types: props.types.map(typeInfo => typeInfo.type.name),
							selected: false
						}))
				);

				// Making all request in parallel
				const pokemons = await Promise.all(pokemonDetailsPromises);
				// Update loaded pokemons
				const fused = [...loadedPokemons, ...pokemons];

				setLoadedPokemons(fused);
			});
	}

	// @TODO(ellora): More efficient way to ensure
	async function ensureThatPokemons(pokemonsId) {
		const biggest = pokemonsId.sort((a, b) => b - a).shift();
		await queryPokemons(0, biggest);
	}

	function selectPokemon(id) {
		setLoadedPokemons(loadedPokemons.map(pokemon => {
			if (pokemon.id == id) {
				pokemon.selected = true;
			}
			return pokemon;
		}));
	}

	function unselectPokemon(id) {
		setLoadedPokemons(loadedPokemons.map(pokemon => {
			if (pokemon.id == id) {
				pokemon.selected = false;
			}
			return pokemon;
		}));
	}

	return (
		<Context.Provider value={{
			loadedPokemons,
			queryPokemons,
			selectPokemon,
			unselectPokemon,
			ensureThatPokemons,
		}}>
			{children}
		</Context.Provider>
	);
}


export function usePokemonsContext() {
	return useContext(Context);
}

