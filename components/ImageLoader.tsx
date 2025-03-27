// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import React, { useState } from "react";
import Image from "next/image";

export function ImageLoader({ src, alt, ...props }) {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<Image
			src={imageLoaded ? src : "/images/spinner.gif"}
			alt={alt}
			{...props}
			onLoad={() => setImageLoaded(true)}
			onError={() => setImageLoaded(false)}
		/>
	);
}
