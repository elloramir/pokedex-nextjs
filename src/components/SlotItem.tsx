import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/TeamSlots.module.css';
import { usePokemonsContext } from '../contexts/Pokemons';
import colors from "../data/colors.json";

const SlotItem = ({ slot }) => {
  const { addPokemonToTeam, setSelectedSlotId, selectedSlotId } = usePokemonsContext();
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

  // Use efeito para restaurar a cor original quando o Pokémon for removido do slot
  useEffect(() => {
    if (!slot.pokemon && objectRef.current && initialFillRef.current) {
      const svgDoc = objectRef.current.contentDocument;
      if (svgDoc) {
        const firstPath = svgDoc.querySelector('path');
        if (firstPath) {
          firstPath.setAttribute('fill', initialFillRef.current);
        }
      }
    }
  }, [slot.pokemon]);

  return (
    <div 
      className={`${styles.slot} ${slot.id === selectedSlotId ? styles.selectedSlot : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => { setSelectedSlotId(slot.id); }}
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

export default SlotItem;
