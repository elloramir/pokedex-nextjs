// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import styles from '@/styles/Header.module.css';

import React from 'react';
import Link from "next/link";

export function Header({ label, url }) {
	return (
		<Link href={url} className={styles.link} >
			<header className={styles.header}>
				<h1>{ label.toUpperCase() }</h1>
			</header>
		</Link>
	)
}
