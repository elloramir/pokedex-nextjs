// Copyright 2025 Elloramir.
// All rights over the code are reserved.

"use client";

import styles from "@/styles/Slots.module.css";

import React, { useRef, useState } from "react";
import { SlotItem } from "@/components/SlotItem";
import { useTeamContext } from "@/contexts/Team";
import colors from "@/data/colors.json";

export function Slots({ isPreview = false }) {
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
				{titleName.current}
			</h2>

			{
				!isEditable && <button 
					className={styles.editButton} 
					onClick={handleEnterEdit} 
					aria-label="Editar título"
				>
					<i className="bi bi-pencil-fill"></i>
				</button>
			}

			<div className={styles.slotContainer}>
				<div className={styles.slotGroup}>
					{ slots.slice(0, 3).map((slot, index) => (
						<SlotItem key={index} index={index} />
					))}
				</div>
				<div className={styles.slotGroup}>
				 	{ slots.slice(0, 3).map((slot, index) => (
						<SlotItem key={index+3} index={index+3} />
					))}
				</div>
			</div>
		</div>
	);
}