// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import styles from "@/styles/Pokemons.module.css";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import colors from "@/data/colors.json";
import { usePokemonsContext } from "@/contexts/Pokemons";
import { useTeamContext } from "@/contexts/Team";

export function Pokemons() {
    const { loadedPokemons, selectPokemon, queryPokemons } = usePokemonsContext();
    const { activeSlot, addPokemon, slots, clearSlot } = useTeamContext();
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(false); // Add loading state

    // Function that checks if the scroll has reached the bottom
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
            // If it's 50px from the bottom, load more pokemons
            if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
                setLoading(true); // Set loading to true when starting to load more
                // Load 32 more pokemons from the already loaded ones
                queryPokemons(loadedPokemons.length, 32).finally(() => {
                    setLoading(false); // Set loading to false once loading is complete
                });
            }
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        // Remove event listener when the component unmounts
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loadedPokemons, loading]);

    // To limit the length of the pokemon's name
    function clampName(name, length = 7) {
        if (name.length > length) {
            return name.slice(0, length) + '...';
        }
        return name;
    }

    // When starting to drag
    function handleDragStart(e, pokemon) {
        if (pokemon.selected) {
            e.preventDefault();
            return;
        }
        e.dataTransfer?.setData('text/plain', String(pokemon.index));
    };

    // When clicking to select
    function handleClick(pokemon) {
        if (activeSlot) {
            clearSlot(activeSlot);
            selectPokemon(pokemon.index);
            addPokemon(activeSlot, pokemon.index);
        }
    }

    return (
        <div className={styles.choose}>
            <h2 className={styles.title}>Choose 6 Pokemons:</h2>
            <div ref={scrollRef} className={styles.scrollContainer}>
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
                    )) }
                </div>
                {/* Show spinner if loading */}
                {loading && (
                    <div className={styles.spinnerContainer}>
                        <Image 
                            src="/images/spinner.gif" 
                            alt="Loading..." 
                            width={50} 
                            height={50} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
