// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'


// We only have that endpoint, so the client instance could
// be here for sure! Show me the book...
const prisma = new PrismaClient();


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