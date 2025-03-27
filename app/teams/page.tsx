// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client"

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { TeamView } from "@/components/TeamView"; 
import { usePokemonsContext } from "@/contexts/Pokemons";


export default function PageTeams() {
    const [teams, setTeams] = useState([]);
    const { ensureThatPokemons } = usePokemonsContext();


    useEffect(() => {
        fetch("/api")
            .then(resp => resp.json())
            .then(async (teams) => {
                const toLoadPokemons = new Set();
                const newTeams = teams.map(team => Object({
                    name: team.name,
                    pokemons: team.slots.map((slot) => {
                        toLoadPokemons.add(slot.pokemonId);
                        return slot.pokemonId - 1;
                    })
                }))

                await ensureThatPokemons(Array.from(toLoadPokemons));
                setTeams(newTeams);
            });
    }, []);

    return (
        <div className="app">
            <Header label="create new team" url="/create" />
            <div className="content">
                {
                    teams.map((team, index) => (
                        <TeamView key={index} isPreview={true} name={team.name} pokemons={team.pokemons} />
                    ))
                }
            </div>
        </div>
    );
}
