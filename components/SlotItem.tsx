// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import styles from "@/styles/Slots.module.css";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import colors from "@/data/colors.json";
import { ImageLoader } from "@/components/ImageLoader";
import { useTeamContext } from "@/contexts/Team";
import { usePokemonsContext } from "@/contexts/Pokemons";


export function SlotItem({ index, fixedPokemon }) {
	const { slots, setActiveSlot, activeSlot, addPokemon, clearSlot } = useTeamContext();
	const { selectPokemon, unselectPokemon, loadedPokemons } = usePokemonsContext();
	const pokemon = loadedPokemons?.find(e => e.id === (fixedPokemon || slots[index]));
	const svgRef = useRef(null);
	const isSameSlot = useRef(false);

	const ImageComponent = !fixedPokemon ? Image : ImageLoader;

	// Handle pokemons dropped over us
	function handleDrop(e) {
		e.preventDefault();

		const pokemonData = e.dataTransfer.getData("text/plain");
		const pokemonId = Number(pokemonData);

		// Ignore same slots drop
		if (slots.findIndex(p => p === pokemon?.id) === index) {
			isSameSlot.current = true;
		}

		// If we already have a pokemon on that slot
		// we should remove it first!
		if (pokemon) {
			clearSlot(index);
			unselectPokemon(pokemon.id);
		}

		selectPokemon(pokemonId);
		addPokemon(index, pokemonId);
	};

	function handleDragOver(e) {
		e.preventDefault();
	}

	function handleDragStart(e) {
		if (fixedPokemon) {
			e.preventDefault();
			return;
		}

		isSameSlot.current = false;
		e.dataTransfer.setData("text/plain", String(pokemon.id));
	};

	// Allways clear it when moved-out
	function handleDragEnd(e) {
		if (!isSameSlot.current) {
			clearSlot(index);			
		}

		// Check if we dopped the pokemon away.
		// In that particular case we need to unset it since
		// no other slot will do it for us, since we are throwing it
		// out the slots boundaries (like a swip discard).
		if (e.dataTransfer.dropEffect === "none") {
			unselectPokemon(pokemon.id);
		}
	}

	function handleSlotClick() {
		if (!fixedPokemon) {
			setActiveSlot(index);
		}
	}

	// Change svg color dynamicaly every time slots change
	useEffect(() => {
		const updateSVGColor = () => {
			const svg = svgRef.current?.contentDocument;
			const path = svg?.querySelector("path");
			const color = pokemon ? colors[pokemon.types[0]] : "#fff";

			if (path) {
				path.setAttribute("fill", color);
			}
		};

		// Allways try even if not loaded
		updateSVGColor();

		const svgElement = svgRef.current;
		if (svgElement) {
			svgElement.addEventListener("load", updateSVGColor);
		}

		return () => {
			svgElement?.removeEventListener("load", updateSVGColor);
		};
	}, [slots]);



	return (
		<div 
			className={`${styles.slot} ${activeSlot !== null && activeSlot !== index ? styles.graySelection : ""} ${(index === activeSlot && !fixedPokemon) ? styles.selectedSlot : ""}`}
			style={{ border: (!fixedPokemon && activeSlot === index && pokemon) ? `5px dashed ${colors[pokemon.types[0]]}` : "" }}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleSlotClick}
		>
			{pokemon && (
				<ImageComponent
					draggable
					src={pokemon.image} 
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					alt={pokemon.name}
					fill 
					style={{ objectFit: "contain" }}
				/>
			)}
			{/* @NOTE(ellora): Objects are significantly slower than images and pure svg elements */}
			<object 
				data="/images/slot.svg"
				type="image/svg+xml" 
				className={styles.slotObject}
				ref={svgRef}
			/>
		</div>
	);
}