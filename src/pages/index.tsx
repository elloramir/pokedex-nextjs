import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Team Builder</title>
                <meta name="description" content="Construa seu time de Pokémon de forma fácil!" />
                <meta name="keywords" content="pokemon, team builder, react, next.js" />
                <meta name="author" content="Elloramir" />
                <meta property="og:title" content="Pokemon Team Builder" />
                <meta property="og:description" content="Construa seu time de Pokémon de forma fácil!" />
            </Head>

            <div className="app">
                <header className="header">
                    <span>TEAMS</span>
                </header>

                <div className="content">
                    <div className="teams">
                        <h3 className="title">My Team</h3>
                        <div className="slot-group">
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                        </div>
                        <div className="slot-group">
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                            <object className="slot" type="image/svg+xml" data="images/slot.svg"></object>
                        </div>

                        <div className="options">
                            <button className="button-image danger disabled">
                                <img src="images/delete.png" />
                            </button>

                            <button className="button-image success disabled">
                                <img src="images/select.png" />
                            </button>
                        </div>
                    </div>

                    <div className="choose">
                        <h3 className="title">Choose 6 Pokemons:</h3>
                        <div className="scroll">
                            <div className="group-pokemon">
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map(e =>
                                        <div className="pokemon">
                                            <div className="number">#1</div>
                                            <div className="preview" style={{backgroundImage: "url(https:\/\/i.imgur.com/ROHzrQz.png)"}}></div>
                                            <div className="name">Bulbasaur</div>
                                            <div className="kinds">
                                                <span className="bug"></span>
                                                <span className="fire"></span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
