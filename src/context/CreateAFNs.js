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
        const afnDig = AFNFactory.closurePlus(AFNFactory.createBasicAFN('0_9'));
        const afnPlus = AFNFactory.createBasicAFN('+');
        const afnMinus = AFNFactory.createBasicAFN('-');
        const afnPor = AFNFactory.createBasicAFN('*');
        const afnDivision = AFNFactory.createBasicAFN('/');
        const afnLP = AFNFactory.createBasicAFN('(');
        const afnRP = AFNFactory.createBasicAFN(')');
        const afnDot = AFNFactory.createBasicAFN('.');
        const concatDot = AFNFactory.concatAFN(afnDig, afnDot);
        const concatDecimal = AFNFactory.concatAFN(concatDot, afnDig);
        const joinDigits = AFNFactory.joinAFN(concatDecimal, afnDig);
        const joinPlus = AFNFactory.joinAFN(joinDigits, afnPlus);
        const joinMinus = AFNFactory.joinAFN(joinPlus, afnMinus);
        const joinPor = AFNFactory.joinAFN(joinMinus, afnPor);
        const joinDivision = AFNFactory.joinAFN(joinPor, afnDivision);
        const joinLP = AFNFactory.joinAFN(joinDivision, afnLP);
        const joinRP = AFNFactory.joinAFN(joinLP, afnRP);

        const afn1 = AFNFactory.createBasicAFN('a');
        const afn2 = AFNFactory.createBasicAFN('b');
        const joinAFN = AFNFactory.joinAFN(afn1, afn2);
        const closureAFN = AFNFactory.closurePlus(afn1);
        const afd = AFNConverter.convertAFNtoAFD(joinAFN);
        const afd2 = AFNConverter.convertAFNtoAFD(afnDig);
        const afdOperations = AFNConverter.convertAFNtoAFD(joinRP);
        pushAFN('afn digitos', afnDig);
        pushAFN('afn decimal', joinDigits);
        pushAFN('afn a', afn1);
        pushAFN('afn b', afn2);
        pushAFN('join a-b', joinAFN);
        pushAFN('closure a', closureAFN);
        pushAFN('AFD join', afd);
        pushAFN('AFD Digitos', afd2);
        pushAFN('AFD operations', afdOperations);
    }, []);

	return (
		<div>
			
		</div>
	)
}
