// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client"

import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { TeamView } from "@/components/TeamView"; 
import { SlotsOptions } from "@/components/SlotsOptions"; 
import { Pokemons } from "@/components/Pokemons";
import { usePokemonsContext } from "@/contexts/Pokemons";


export default function PageCreate() {
    const { queryPokemons } = usePokemonsContext();

    // Query initial pokemons and save it.
    // We can load more pokemons by scrolling the list until the end.
    useEffect(() => { queryPokemons(0, 16) }, []);

    return (
        <div className="app">
            <Header label="teams" url="/teams" />
            <div className="content">
                <TeamView />
                <SlotsOptions />
                <Pokemons />
            </div>
        </div>
    );
}
