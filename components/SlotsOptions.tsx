// Copyright 2025 Elloramir.
// All rights over the code are reserved.


"use client";

import styles from "@/styles/SlotsOptions.module.css";

import React, { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTeamContext } from "@/contexts/Team";
import { usePokemonsContext } from "@/contexts/Pokemons";

export function SlotsOptions() {
	const { slots, titleName, activeSlot, clearSlot } = useTeamContext();
	const { unselectPokemon, loadedPokemons } = usePokemonsContext();
	const pokemonId = slots[activeSlot];
	const isComplete = slots.every(slot => slot !== null);

	// State to control loading status
	const [isLoading, setIsLoading] = useState(false);

	function handleRemoveActiveSlot() {
		unselectPokemon(pokemonId);
		clearSlot(activeSlot);
	}

	function handleSaveTeam() {
		setIsLoading(true); // Set loading state to true when the request starts

		fetch("api", {
			method: "post",
			body: JSON.stringify({
				name: titleName.current,
				pokemons: slots.map(index => loadedPokemons[index].id),
			})
		})
		.then((resp) => {
			if (resp.status === 201) {
				redirect("/teams");
			} else {
				alert("Can't save that pokemon team");
				setIsLoading(false);
			}
		});
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
				className={`${styles.buttonImage} ${styles.success} ${!isComplete || isLoading ? styles.disabled : ""}`}
				aria-label="Select Team"
				onClick={handleSaveTeam}
				disabled={!isComplete || isLoading}
			>
				<Image 
					src={isLoading ? "/images/spinner.gif" : "/images/select.png"} 
					className={styles.bright}
					alt="Select" 
					width={30} 
					height={30}
				/>
			</button>
		</div>
	);
};
