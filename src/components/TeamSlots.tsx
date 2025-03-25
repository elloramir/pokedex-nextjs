import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/TeamSlots.module.css';
import { usePokemonsContext } from '../contexts/Pokemons';
import colors from "../data/colors.json";

const SlotItem = ({ slot }) => {
  const { addPokemonToTeam } = usePokemonsContext();
  const objectRef = useRef(null);
  const initialFillRef = useRef(null);

  // Ao carregar o SVG, guarda a cor original do primeiro path
  const handleObjectLoad = () => {
    if (objectRef.current) {
      const svgDoc = objectRef.current.contentDocument;
      if (svgDoc) {
        const firstPath = svgDoc.querySelector('path');
        if (firstPath) {
          initialFillRef.current = firstPath.getAttribute('fill');
        }
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const pokemonData = e.dataTransfer.getData('text/plain');
    const droppedPokemon = JSON.parse(pokemonData);

    addPokemonToTeam(droppedPokemon, slot.id);

    // Altera a cor do path para a cor do tipo do Pokémon ao realizar o drop
    if (objectRef.current) {
      const svgDoc = objectRef.current.contentDocument;
      if (svgDoc) {
        const firstPath = svgDoc.querySelector('path');
        if (firstPath) {
          const type = droppedPokemon.types[0];
          firstPath.setAttribute('fill', colors[type]);
        }
      }
    }
  };

  // No evento de dragStart, ao iniciar a remoção, restauramos a cor original do path
  const handleDragStart = (e) => {
    if (objectRef.current) {
      const svgDoc = objectRef.current.contentDocument;
      if (svgDoc) {
        const firstPath = svgDoc.querySelector('path');
        if (firstPath && initialFillRef.current) {
          firstPath.setAttribute('fill', initialFillRef.current);
        }
      }
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(slot.pokemon));
  };

  return (
    <div 
      className={styles.slot}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {slot.pokemon && (
        <Image 
          draggable
          src={slot.pokemon.imageUrl} 
          onDragStart={handleDragStart}
          alt={slot.pokemon.name}
          fill 
          style={{ objectFit: 'contain' }}
        />
      )}
      <object 
        data="/images/slot.svg" 
        type="image/svg+xml" 
        className={styles.slotObject}
        ref={objectRef}
        onLoad={handleObjectLoad}
      />
    </div>
  );
};

export const TeamSlots = () => {
  const { teamSlots, teamName } = usePokemonsContext();
  const [isEditable, setIsEditable] = useState(false);
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
    teamName.current = e.currentTarget.textContent; // Atualiza o nome da equipe com o conteúdo editado
  };

  // Função chamada quando a tecla Enter é pressionada
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Ao pressionar Enter, desativa a edição
      setIsEditable(false);
      titleRef.current.blur(); // Remove o foco do título (finaliza a edição)
    }
  };

  return (
    <div className={styles.teams}>
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
