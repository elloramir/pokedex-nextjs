import Head from 'next/head';
import { PokemonProvider } from '../contexts/Pokemons';
import { Header } from '../components/Header';
import { TeamSlots } from '../components/TeamSlots';
import { TeamOptions } from '../components/TeamOptions';
import { PokemonGrid } from '../components/PokemonGrid';

export default function Home() {
    return (
        <PokemonProvider>
            <Head>
                <title>Pokémon Team Builder</title>
                <meta name="description" content="Build your perfect Pokémon team with ease!" />
                <meta name="keywords" content="pokemon, team builder, next.js, react" />
                <meta name="author" content="Your Name" />
                <meta property="og:title" content="Pokémon Team Builder" />
                <meta property="og:description" content="Build your perfect Pokémon team with ease!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="app">
                <Header />
                <div className="content">
                    <TeamSlots />
                    <TeamOptions />
                    <PokemonGrid />
                </div>
            </div>
        </PokemonProvider>
    );
}