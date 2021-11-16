import React, { useState} from 'react';
import GrammarFactory from '../../Gramatica/GrammarFactory';

import AllAFN from '../AllAFN';
import Button from '../Button';

function SintacticAnalizer (){
  const [grammar, setGrammar] = useState(
`E -> E+T | E-T | T
T -> T*F | T/F | F
F -> (E) | num`)

  function analize() {
    const augmentedGrammar = GrammarFactory.createGrammar(grammar);
    const lockItems = augmentedGrammar.lock({state: "E'", word: 'E' })
    console.log(augmentedGrammar);
    console.log(lockItems);
  }

  return (
    <div className="flex pt-16 h-screen">
      <div className="bg-white w-4/5 text-center ">
        <h1 className="text-gray font-bold text-4xl p-6">
          Analizador Sintactico
        </h1>
        <div className='m-auto'>
          <textarea className='bg-gray-middle' rows={10} cols={40} 
                    value={grammar} onChange={e=>setGrammar(e.target.value)} 
                    spellCheck="false"/>
          <Button label="Analizar" onClick={analize} />
        </div>
      </div>
      <AllAFN />
    </div>
  )
}

export default SintacticAnalizer;
