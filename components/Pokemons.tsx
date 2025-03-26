// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import styles from "@/styles/Pokemons.module.css";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import colors from "@/data/colors.json";
import { usePokemonsContext } from "@/contexts/Pokemons";
import { useTeamContext } from "@/contexts/Team";


export function Pokemons() {
    const { loadedPokemons, selectPokemon } = usePokemonsContext();
	const { activeSlot, addPokemon, slots, clearSlot } = useTeamContext();


    // In order to fit on the layout, we should
    // limit the total amount of char a pokemon can display.
    function clampName(name, length = 7) {
    	if (name.length > length) {
    		return name.slice(0, length) + '...';
    	}
    	return name;
    }


    // Whne we start move the pokemon to somewhere (team slot maybe)
    function handleDragStart(e, pokemon) {
    	// Ignoraa already selected pokemons
        if (pokemon.selected) {
            e.preventDefault();
            return;
        }

        // Set draggable data to our pokemon
        e.dataTransfer?.setData('text/plain', String(pokemon.id));
    };


    // We can also select pokemons to current slot by clicking on it!
    function handleClick(pokemon) {
    	if (activeSlot) {
            clearSlot(activeSlot);
            selectPokemon(pokemon.id);
    		addPokemon(activeSlot, pokemon.id);
    	}
    }

	return (
        <div className={styles.choose}>
            <h2 className={styles.title}>Choose 6 Pokemons:</h2>
            <div className={styles.scrollContainer}>
                <div className={styles.pokemonGrid}>
                    { loadedPokemons.map((pokemon) => (
                        <div 
                            key={pokemon.id} 
                            className={styles.pokemonCard}
                        >
                            <div className={styles.pokemonNumber}>#{pokemon.number}</div>
                            <div className={styles.pokemonPreview}>
                                <Image 
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, pokemon)}
                                    onClick={() => handleClick(pokemon)}
                                    src={pokemon.image} 
                                    alt={pokemon.name} 
                                    fill 
                                    style={{ objectFit: 'contain' }}
                                />

                                {
                                    pokemon.selected &&
                                        <div className={styles.pokemonSelected}>
                                            <Image 
                                                src="/images/select.png" 
                                                alt="Pokemon already selected"
                                                width={30} 
                                                height={30}
                                            />
                                        </div>
                                }
                                
                            </div>
                            <div className={styles.pokemonName}>{clampName(pokemon.name)}</div>
                            <div className={styles.pokemonTypes}>
                                { pokemon.types.map((type) => (
                                    <span 
                                        key={type} 
                                        className={styles.typeIndicator}
                                        style={{ backgroundColor: colors[type] }}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}