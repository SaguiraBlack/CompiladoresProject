import React, { useEffect} from 'react';
import AFNConverter from '../AFN/AFNConverter';
import AFNFactory from '../AFN/AFNFactory';
import useAFNs from './useAFNs';

export default function CreateAFNs() {
    const [myAFNs, setMyAFNs] = useAFNs();

    function pushAFN(name, afn) {
        setMyAFNs( arr=>[...arr, {name, afn}]);
    }
    useEffect(()=>{
        const afnDig = AFNFactory.createBasicAFN('0-9');
        const afn1 = AFNFactory.createBasicAFN('a');
        const afn2 = AFNFactory.createBasicAFN('b');
        const joinAFN = AFNFactory.joinAFN(afn1, afn2);
        const closureAFN = AFNFactory.closurePlus(afn1);
        const afd = AFNConverter.convertAFNtoAFD(joinAFN);
        const afd2 = AFNConverter.convertAFNtoAFD(afnDig);
        pushAFN('afn digitos', afnDig);
        pushAFN('afn a', afn1);
        pushAFN('afn b', afn2);
        pushAFN('join a-b', joinAFN);
        pushAFN('closure a', closureAFN);
        pushAFN('AFD join', afd);
        pushAFN('AFD Digitos', afd2);
    }, []);

	return (
		<div>
			
		</div>
	)
}
