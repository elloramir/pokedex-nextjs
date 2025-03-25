import React from 'react';
import Image from 'next/image';
import { usePokemonsContext } from '../contexts/Pokemons'; // Adjust the import path as needed
import styles from '../styles/TeamOptions.module.css';

export const TeamOptions: React.FC = () => {
    const { teamSlots, selectedSlotId, removePokemonFromTeam } = usePokemonsContext();
    

    // Check if all 6 team slots are filled
    const isTeamComplete = teamSlots.every(slot => slot.pokemon !== undefined);

    return (
        <div className={styles.options}>
            <button 
                className={`${styles.buttonImage} ${styles.danger} ${selectedSlotId === null ? styles.disabled : ''}`}
                aria-label="Delete Team"
                onClick={() => removePokemonFromTeam(selectedSlotId!)}
            >
                <Image 
                    src="/images/delete.png" 
                    alt="Delete" 
                    width={30} 
                    height={30} 
                />
            </button>
            <button 
                className={`${styles.buttonImage} ${styles.success} ${!isTeamComplete ? styles.disabled : ''}`}
                aria-label="Select Team"
                disabled={!isTeamComplete}
            >
                <Image 
                    src="/images/select.png" 
                    alt="Select" 
                    width={30} 
                    height={30}
                />
            </button>
        </div>
    );
};