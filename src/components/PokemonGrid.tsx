import React from 'react';
import Image from 'next/image';
import styles from '../styles/PokemonGrid.module.css';
import colors from "../data/colors.json";
import { usePokemonsContext } from '../contexts/Pokemons';

export const PokemonGrid: React.FC = () => {
    const { availablePokemons } = usePokemonsContext();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pokemon: any) => {
        if (pokemon.selected) {
            e.preventDefault();
            return;
        }

        e.dataTransfer?.setData('text/plain', JSON.stringify(pokemon));
    };

    const clampName = (name: string, length = 7) => {
        return name.length > length ? name.slice(0, length) + '...' : name;
    };

    return (
        <div className={styles.choose}>
            <h2 className={styles.title}>Choose 6 Pokemons:</h2>
            <div className={styles.scrollContainer}>
                <div className={styles.pokemonGrid}>
                    {availablePokemons.map((pokemon) => (
                        <div 
                            key={pokemon.id} 
                            className={styles.pokemonCard}
                        >
                            <div className={styles.pokemonNumber}>#{pokemon.number}</div>
                            <div className={styles.pokemonPreview}>
                                <Image 
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, pokemon)}
                                    src={pokemon.imageUrl} 
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
                                {pokemon.types.map((type) => (
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
};