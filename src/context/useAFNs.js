import { useContext } from 'react'
import AFNContext from './AFNContext';

export default function useAFNs() {
	return useContext(AFNContext); 
}