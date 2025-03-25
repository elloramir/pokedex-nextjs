import React, { createContext, useState, useContext, ReactNode } from 'react';


export interface PokemonType {
    id: number;
    name: string;
    number: number;
    imageUrl: string;
    types: string[];
}

export interface TeamSlot {
    id: number;
    pokemon?: PokemonType;
}


const initialAvailablePokemons: PokemonType[] = [
    {
        id: 1,
        name: 'Bulbasaur',
        number: 1,
        imageUrl: 'https://i.imgur.com/ROHzrQz.png',
        types: ['grass', 'poison']
    },
    {
        id: 2,
        name: 'Charmander',
        number: 2,
        imageUrl: 'https://i.imgur.com/ROHzrQz.png',
        types: ['fire']
    },
];

interface PokemonContextType {
    availablePokemons: PokemonType[];
    teamSlots: TeamSlot[];
    addPokemonToTeam: (pokemon: PokemonType, slotId: number) => void;
    removePokemonFromTeam: (slotId: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [availablePokemons, setAvailablePokemons] = useState<PokemonType[]>(initialAvailablePokemons);
    const [teamSlots, setTeamSlots] = useState<TeamSlot[]>([
        { id: 1 }, { id: 2 }, { id: 3 },
        { id: 4 }, { id: 5 }, { id: 6 }
    ]);

    const addPokemonToTeam = (pokemon: PokemonType, slotId: number) => {
        // Update team slots
        setTeamSlots(prevSlots => 
            prevSlots.map(slot =>  {
                if (slot.pokemon?.id === pokemon?.id)
                    slot.pokemon = null;

                // @todo: make it unavaliable
                if (slot.id === slotId) {
                    return { ...slot, pokemon: pokemon } 
                }

                return slot;
            })
        );
    };

    const removePokemonFromTeam = (slotId: number) => {
        setTeamSlots(prevSlots => 
            prevSlots.map(slot => 
                slot.id === slotId 
                    ? { ...slot, pokemon: undefined } 
                    : slot
            )
        );
    };

    return (
        <PokemonContext.Provider value={{
            availablePokemons,
            teamSlots,
            addPokemonToTeam,
            removePokemonFromTeam
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

// Custom hook for using the context
export const usePokemonsContext = () => useContext(PokemonContext);