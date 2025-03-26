// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import { Header } from "@/components/Header";
import { TeamView } from "@/components/TeamView"; 
import { SlotsOptions } from "@/components/SlotsOptions"; 
import { Pokemons } from "@/components/Pokemons";


export default function PageCreate() {
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
