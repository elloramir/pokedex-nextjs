// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/global.css";

import { Roboto } from "next/font/google";
import { TeamProvider } from "@/contexts/Team";
import { PokemonsProvider } from "@/contexts/Pokemons";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                <title>Pokémon Team Builder</title>
                <meta name="description" content="Build your perfect Pokémon team with ease!" />
                <meta name="keywords" content="pokemon, team builder, next.js, react" />
                <meta name="author" content="Your Name" />
                <meta property="og:title" content="Pokémon Team Builder" />
                <meta property="og:description" content="Build your perfect Pokémon team with ease!" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={roboto.className}>
                <PokemonsProvider>
                    <TeamProvider>
                        {children}
                    </TeamProvider>
                </PokemonsProvider>
            </body>
        </html>
    );
}
