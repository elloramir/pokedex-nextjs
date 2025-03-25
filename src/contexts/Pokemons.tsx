import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Definindo o tipo do Pokémon
export interface PokemonType {
    id: number;
    name: string;
    number: number;
    imageUrl: string;
    types: string[];
    selected: boolean;
}

// Definindo o tipo do slot da equipe
export interface TeamSlot {
    id: number;
    pokemon?: PokemonType;
}

interface PokemonContextType {
    availablePokemons: PokemonType[];
    teamSlots: TeamSlot[];
    addPokemonToTeam: (pokemon: PokemonType, slotId: number) => void;
    removePokemonFromTeam: (slotId: number) => void;
    togglePokemonSelection: (pokemonId: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Função para buscar pokémons da PokeAPI
const fetchPokemons = async () => {
    const pokemons: PokemonType[] = [];
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=36');
    const data = await response.json();
    
    for (const pokemon of data.results) {
        const pokemonDetails = await fetch(pokemon.url);
        const details = await pokemonDetails.json();

        if (details.id % 3 === 0) {
            const newPokemon: PokemonType = {
                id: details.id,
                name: details.name,
                number: details.id,
                imageUrl: details.sprites.front_default,
                types: details.types.map((typeInfo: any) => typeInfo.type.name),
                selected: false
            };
            
            pokemons.push(newPokemon);
        }
    }
    return pokemons;
};

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [availablePokemons, setAvailablePokemons] = useState<PokemonType[]>([]);
    const [teamSlots, setTeamSlots] = useState<TeamSlot[]>([
        { id: 1 }, { id: 2 }, { id: 3 },
        { id: 4 }, { id: 5 }, { id: 6 }
    ]);

    // Efeito para carregar os pokémons assim que o componente for montado
    useEffect(() => {
        const loadPokemons = async () => {
            const pokemons = await fetchPokemons();
            setAvailablePokemons(pokemons);
        };

        loadPokemons();
    }, []);

    const addPokemonToTeam = (pokemon: PokemonType, slotId: number) => {
        // Primeiro, vamos identificar se o slot alvo já tem um Pokémon diferente
        const targetSlot = teamSlots.find(slot => slot.id === slotId);
        const overwrittenPokemonId = targetSlot?.pokemon && targetSlot.pokemon.id !== pokemon.id
            ? targetSlot.pokemon.id
            : null;
    
        // Remover o Pokémon das demais posições caso ele já esteja em algum slot
        setTeamSlots(prevSlots => 
            prevSlots.map(slot => 
                slot.pokemon?.id === pokemon.id
                    ? { ...slot, pokemon: undefined }
                    : slot
            )
        );
    
        // Atualizar o slot alvo com o novo Pokémon
        setTeamSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.id === slotId
                    ? { ...slot, pokemon: pokemon }
                    : slot
            )
        );
    
        // Se houver um Pokémon sobrescrito, atualize-o para "selected: false"
        if (overwrittenPokemonId) {
            setAvailablePokemons(prevPokemons =>
                prevPokemons.map(p =>
                    p.id === overwrittenPokemonId ? { ...p, selected: false } : p
                )
            );
        }
    
        // Atualiza o novo Pokémon como selecionado
        setAvailablePokemons(prevPokemons =>
            prevPokemons.map(p =>
                p.id === pokemon.id ? { ...p, selected: true } : p
            )
        );
    };

    const removePokemonFromTeam = (slotId: number) => {
        const pokemonToRemove = teamSlots.find(slot => slot.id === slotId)?.pokemon;

        setTeamSlots(prevSlots => 
            prevSlots.map(slot => 
                slot.id === slotId ? { ...slot, pokemon: undefined } : slot
            )
        );

        // Remove a seleção do pokemon quando removido da equipe
        if (pokemonToRemove) {
            setAvailablePokemons(prevPokemons => 
                prevPokemons.map(p => 
                    p.id === pokemonToRemove.id 
                        ? { ...p, selected: false } 
                        : p
                )
            );
        }
    };

    const togglePokemonSelection = (pokemonId: number) => {
        setAvailablePokemons(prevPokemons => 
            prevPokemons.map(pokemon => 
                pokemon.id === pokemonId 
                    ? { ...pokemon, selected: !pokemon.selected } 
                    : pokemon
            )
        );
    };

    return (
        <PokemonContext.Provider value={{
            availablePokemons,
            teamSlots,
            addPokemonToTeam,
            removePokemonFromTeam,
            togglePokemonSelection
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

// Custom hook para usar o contexto
export const usePokemonsContext = () => useContext(PokemonContext);