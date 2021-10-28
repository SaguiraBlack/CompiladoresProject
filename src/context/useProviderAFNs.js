import { useState } from "react";

export default function useProviderAFNs() {
	const [myAFNs, setMyAFNs] = useState([]);

	return [myAFNs, setMyAFNs];
}