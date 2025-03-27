// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import styles from "@/styles/Slots.module.css";

import React, { useRef, useState } from "react";
import { SlotItem } from "@/components/SlotItem";
import { useTeamContext } from "@/contexts/Team";
import colors from "@/data/colors.json";

export function TeamView({ isPreview = false, name = null, pokemons = null }) {
	const { slots, setSlots, titleName } = useTeamContext();
	const [ isEditable, setIsEditable ] = useState(false);
  	const selfRef = useRef(null);
  	const titleRef = useRef(null);


  	// Enter on edit mode to change titleName
  	function handleEnterEdit() {
		setIsEditable(true);
		setTimeout(() => {
			const range = document.createRange();
			const selection = window.getSelection();
			
			if (titleRef.current) {
				// Move cursor to the end of the text
				range.selectNodeContents(titleRef.current);
				range.collapse(false);
				selection.removeAllRanges();
				// Apply the range to place the cursor at the end
				selection.addRange(range);
				// Focus on the title
				titleRef.current.focus();
			}
		}, 0);
	};


	// Called when we loose focus from the editable area
	function handleBlur() {
		setIsEditable(false);
	};


	// Updates the title name when input recived
	function handleInput(e) {
		titleName.current = e.currentTarget.textContent;
	};


	// Exit from edit mode by pressing enter 
	function handleKeyDown(e) {
		if (e.key === 'Enter') {
			setIsEditable(false);
			// Forces blur
			titleRef.current.blur();
		}
	};


	return (
		<div
			ref={selfRef}
			className={styles.teams}
		>
			<h2 
				className={styles.title} 
				contentEditable={isEditable}
				ref={titleRef}
				onInput={handleInput}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				suppressContentEditableWarning
			>
				{ isPreview ? name : titleName.current}
			</h2>

			{
				(!isEditable && !isPreview) && <button 
					className={styles.editButton} 
					onClick={handleEnterEdit} 
					aria-label="Editar título"
				>
					<i className="bi bi-pencil-fill"></i>
				</button>
			}

			<div className={styles.slotContainer}>
				<div className={styles.slotGroup}>
					{ [0, 1, 2].map((index) => (
						<SlotItem key={index} index={index} fixedPokemon={pokemons?.[index]} />
					))}
				</div>
				<div className={styles.slotGroup}>
				 	{ [3, 4, 5].map((index) => (
						<SlotItem key={index} index={index} fixedPokemon={pokemons?.[index]} />
					))}
				</div>
			</div>
		</div>
	);
}