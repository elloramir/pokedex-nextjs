// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import path from "path";
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'


// We only have that endpoint, so the client instance could
// be here for sure! Show me the book...
declare global {
	// eslint-disable-next-line no-var
	var cachedPrisma: PrismaClient;
}

// Workaround to find the db file in production
const filePath = path.join(process.cwd(), 'prisma/dev.db');
const config = {
	datasources: {
		db: {
			url: 'file:' + filePath,
		},
	},
};

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient(config);
} else {
	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient(config);
	}
	prisma = global.cachedPrisma;
}


export async function POST(request: Request) {
	try {
		const { name, pokemons } = await request.json();
		console.log(name, pokemons)

		if (!name || !pokemons || pokemons.length !== 6) {
			return NextResponse.json(
				{ error: "The team needs exactly 6 pokemons" },
				{ status: 400 }
			)
		}

		const team = await prisma.team.create({
			data: {
				name,
				slots: {
					create: pokemons.map((pokemonId: number, index: number) => ({
						pokemonId,
						position: index + 1
					}))
				}
			},
			include: {
				slots: true
			}
		})

		return NextResponse.json(team, { status: 201 })
		
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		)
	}
}

export async function GET() {
	try {
		const teams = await prisma.team.findMany({
			include: {
				slots: {
					orderBy: { position: 'asc' }
				}
			}
		})
		return NextResponse.json(teams)

	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		)
	}
}