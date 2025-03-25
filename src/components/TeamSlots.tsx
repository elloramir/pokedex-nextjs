import React from 'react';
import Image from 'next/image';
import styles from '../styles/TeamSlots.module.css';
import { usePokemonsContext } from '../contexts/Pokemons';

export const TeamSlots: React.FC = () => {
    const { teamSlots, addPokemonToTeam } = usePokemonsContext();

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotId: number) => {
        e.preventDefault();
        const pokemonData = e.dataTransfer?.getData('text/plain');
        
        if (pokemonData) {
            const droppedPokemon = JSON.parse(pokemonData);
            addPokemonToTeam(droppedPokemon, slotId);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pokemon: any) => {
        e.dataTransfer?.setData('text/plain', JSON.stringify(pokemon));
    };

    return (
        <div className={styles.teams}>
            <h2 className={styles.title}>My Team</h2>
            <div className={styles.slotContainer}>
                <div className={styles.slotGroup}>
                    {teamSlots.slice(0, 3).map((slot) => (
                        <div 
                            key={`top-slot-${slot.id}`} 
                            className={styles.slot}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, slot.id)}
                        >
                            {slot.pokemon ? (
                                <Image 
                                    draggable
                                    src={slot.pokemon.imageUrl} 
                                    onDragStart={(e) => handleDragStart(e, slot.pokemon)}
                                    alt={slot.pokemon.name} 
                                    width={90} 
                                    height={90} 
                                />
                            ) : (
                                <Image 
                                    src="/images/slot.svg" 
                                    alt="Empty Team Slot" 
                                    width={90} 
                                    height={90} 
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.slotGroup}>
                    {teamSlots.slice(3, 6).map((slot) => (
                        <div 
                            key={`bottom-slot-${slot.id}`} 
                            className={styles.slot}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, slot.id)}
                        >
                            {slot.pokemon ? (
                                <Image 
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, slot.pokemon)}
                                    src={slot.pokemon.imageUrl} 
                                    alt={slot.pokemon.name} 
                                    width={90} 
                                    height={90} 
                                />
                            ) : (
                                <Image 
                                    src="/images/slot.svg" 
                                    alt="Empty Team Slot" 
                                    width={90} 
                                    height={90} 
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};