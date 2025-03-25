import React from 'react';
import Image from 'next/image';
import styles from '../styles/PokemonGrid.module.css';
import { usePokemonsContext } from '../contexts/Pokemons';

export const PokemonGrid: React.FC = () => {
    const { availablePokemons } = usePokemonsContext();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pokemon: any) => {
        e.dataTransfer?.setData('text/plain', JSON.stringify(pokemon));
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
                            draggable
                            onDragStart={(e) => handleDragStart(e, pokemon)}
                        >
                            <div className={styles.pokemonNumber}>#{pokemon.number}</div>
                            <div className={styles.pokemonPreview}>
                                <Image 
                                    src={pokemon.imageUrl} 
                                    alt={pokemon.name} 
                                    fill 
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div className={styles.pokemonName}>{pokemon.name}</div>
                            <div className={styles.pokemonTypes}>
                                {pokemon.types.map((type) => (
                                    <span 
                                        key={type} 
                                        className={`${styles.typeIndicator} ${styles[type]}`}
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