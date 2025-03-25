import React from 'react';
import Image from 'next/image';
import styles from '../styles/TeamOptions.module.css';

export const TeamOptions: React.FC = () => {
    return (
        <div className={styles.options}>
            <button 
                className={`${styles.buttonImage} ${styles.danger} ${styles.disabled}`}
                aria-label="Delete Team"
                disabled
            >
                <Image 
                    src="/images/delete.png" 
                    alt="Delete" 
                    width={30} 
                    height={30} 
                />
            </button>
            <button 
                className={`${styles.buttonImage} ${styles.success} ${styles.disabled}`}
                aria-label="Select Team"
                disabled
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