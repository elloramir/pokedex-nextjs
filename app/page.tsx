// Copyright 2025 Elloramir.
// All rights over the code are reserved.

import { redirect } from "next/navigation";

export default function PageIndex() {
	redirect("/create");
	return null;
}
