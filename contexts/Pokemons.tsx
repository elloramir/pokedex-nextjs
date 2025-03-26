// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import React, { createContext, useState, useContext, useEffect, useRef } from "react";


const Context = createContext(undefined);


export function PokemonsProvider({ children }) {
	const [loadedPokemons, setLoadedPokemons] = useState([]);
	
	function queryPokemons(from = 0, to = 32) {
		return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${to}`)
			.then(resp => resp.json())
			.then(async (data) => {
				const pokemons = new Array();

				for (const pokemon of data.results) {
					const details = await fetch(pokemon.url);
					const props = await details.json();

					pokemons.push({
						id: props.id,
						name: props.name,
						number: props.id,
						image: props.sprites.front_default,
						types: props.types.map((typeInfo: any) => typeInfo.type.name),
						selected: false
					});
				}

				const fused = [...loadedPokemons, ...pokemons];
				const indexed = fused.map((pokemon, index) => Object({...pokemon, index}));

				setLoadedPokemons(indexed);
			});
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

	// Query 32 initial pokemons and save it.
	// We can load more pokemons by scrolling the list until the end.
	useEffect(() => { queryPokemons() }, []);

	return (
		<Context.Provider value={{
			loadedPokemons,
			queryPokemons,
			selectPokemon,
			unselectPokemon,
		}}>
			{children}
		</Context.Provider>
	);
}


export function usePokemonsContext() {
	return useContext(Context);
}

