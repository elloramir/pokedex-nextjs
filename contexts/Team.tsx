// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import React, { createContext, useState, useContext, useEffect, useRef } from "react";


const Context = createContext(undefined);


export function TeamProvider({ children }) {
	const [slots, setSlots] = useState(Array(6).fill(null));
	const [activeSlot, setActiveSlot] = useState(null);
	const titleName = useRef("My Team");

	function addPokemon(slotIndex, pokemonId) {
		setSlots(slots.map((old, index) => {
			if (slotIndex === index) {
				return pokemonId;
			}
			return old;
		}));
	}

	function clearSlot(slotIndex) {
		setSlots(slots.map((slot, index) => {
			if (index === slotIndex) return null;
			return slot;
		}));
	}

	return (
		<Context.Provider value={{
			slots,
			setSlots,
			activeSlot,
			setActiveSlot,
			titleName,
			addPokemon,
			clearSlot
		}}>
			{children}
		</Context.Provider>
	);
}


export function useTeamContext() {
	return useContext(Context);
}
