import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/TeamSlots.module.css';
import { usePokemonsContext } from '../contexts/Pokemons';
import colors from "../data/colors.json";
import SlotItem from './SlotItem';

export const TeamSlots = () => {
  const { teamSlots, teamName } = usePokemonsContext();
  const [isEditable, setIsEditable] = useState(false);
  const selfRef = useRef(null);
  const titleRef = useRef(null);

  // Função chamada quando o título é clicado para edição
  const handleTitleClick = () => {
    setIsEditable(true);
    setTimeout(() => {
      const range = document.createRange();
      const selection = window.getSelection();
      
      if (titleRef.current) {
        range.selectNodeContents(titleRef.current);
        range.collapse(false);  // Move cursor to the end of the text
        selection.removeAllRanges();
        selection.addRange(range);  // Apply the range to place the cursor at the end
        titleRef.current.focus(); // Focus on the title
      }
    }, 0);
  };

  // Função chamada quando o título perde o foco
  const handleBlur = () => {
    setIsEditable(false);
  };

  // Função para atualizar o nome da equipe
  const handleInput = (e) => {
    if (e.currentTarget.textContent.length > 15) {
      e.preventDefault();
      return;
    }
    teamName.current = e.currentTarget.textContent; // Atualiza o nome da equipe com o conteúdo editado
  };

  // Função chamada quando a tecla Enter é pressionada
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Ao pressionar Enter, desativa a edição
      setIsEditable(false);
      titleRef.current.blur(); // Remove o foco do título (finaliza a edição)
    }

    if (titleRef.current.textContent.length >= 30 && e.key !== 'Backspace') {
      e.preventDefault();
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
        onKeyDown={handleKeyDown} // Adiciona o evento de tecla pressionada
        suppressContentEditableWarning
      >
        {teamName.current}
      </h2>
      {
        !isEditable && <button 
          className={styles.editButton} 
          onClick={handleTitleClick} 
          aria-label="Editar título"
        >
          <i className="bi bi-pencil-fill"></i> {/* Ícone de caneta */}
        </button>
      }

      <div className={styles.slotContainer}>
        <div className={styles.slotGroup}>
          {teamSlots.slice(0, 3).map((slot) => (
            <SlotItem key={`slot-${slot.id}`} slot={slot} />
          ))}
        </div>
        <div className={styles.slotGroup}>
          {teamSlots.slice(3, 6).map((slot) => (
            <SlotItem key={`slot-${slot.id}`} slot={slot} />
          ))}
        </div>
      </div>
    </div>
  );
};
