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
							image: props.sprites.front_default,
							types: props.types.map(typeInfo => typeInfo.type.name),
							selected: false
						}))
				);

				// Making all request in parallel
				const pokemons = await Promise.all(pokemonDetailsPromises);

				// Update loaded pokemons
				const fused = [...loadedPokemons, ...pokemons];
				const indexed = fused.map((pokemon, index) => Object({ ...pokemon, index }));

				setLoadedPokemons(indexed);
			});
	}

	async function ensureThatPokemons(pokemonsId) {
		const sorted = pokemonsId.sort((a, b) => a-b);
		const promiseChain = sorted.map(pokemonId =>
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
	            .then(resp => resp.json())
	            .then(data => {
	                const pokemon = {
	                    id: data.id,
	                    name: data.name,
	                    number: data.id,
	                    image: data.sprites.front_default,
	                    types: data.types.map((typeInfo) => typeInfo.type.name),
	                    selected: false,
	                };

	                return pokemon;
	            }));

		const pokemons = await Promise.all(promiseChain);
		const fused = [...loadedPokemons];
		
		for (const pokemon of pokemons) {
			fused[pokemon.id] = pokemon;
		}

		setLoadedPokemons(fused);
	}

	function selectPokemon(index) {
		setLoadedPokemons(loadedPokemons.map(pokemon => {
			if (pokemon.index == index) {
				pokemon.selected = true;
			}
			return pokemon;
		}));
	}

	function unselectPokemon(index) {
		setLoadedPokemons(loadedPokemons.map(pokemon => {
			if (pokemon.index == index) {
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

