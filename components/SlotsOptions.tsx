// Copyright 2025 Elloramir.
// All rights over the code are reserved.


"use client";

import styles from "@/styles/SlotsOptions.module.css";

import React from "react";
import Image from "next/image";
import { useTeamContext } from "@/contexts/Team";
import { usePokemonsContext } from "@/contexts/Pokemons";

export function SlotsOptions() {
	const { slots, activeSlot, clearSlot } = useTeamContext();
	const { unselectPokemon } = usePokemonsContext();
	const pokemonId = slots[activeSlot];
	

	function isComplete() {
		return slots.every(slot => slot !== null);
	}

	function handleRemoveActiveSlot() {
		unselectPokemon(pokemonId);
		clearSlot(activeSlot);
	}

	return (
		<div className={styles.options}>
			<button 
				className={`${styles.buttonImage} ${styles.danger} ${activeSlot === null ? styles.disabled : ""}`}
				aria-label="Delete Team"
				onClick={handleRemoveActiveSlot}
				disabled={activeSlot === null}
			>
				<Image 
					src="/images/delete.png" 
					alt="Delete" 
					width={30} 
					height={30} 
				/>
			</button>
			<button 
				className={`${styles.buttonImage} ${styles.success} ${!isComplete() ? styles.disabled : ""}`}
				aria-label="Select Team"
				disabled={ isComplete() }
				// onClick={() => saveTeam()}
			>
				<Image 
					src="/images/select.png" 
					alt="Select" 
					width={30} 
					height={30}
				/>
			</button>
		</div>
	);
};