import React, { useState} from 'react';

import AllAFN from '../AllAFN';
import Button from '../Button';

function SintacticAnalizer (){
  const [grammar, setGrammar] = useState(`E:T,Ep\nEp:mas,T,Ep|menos,T,Ep|epsilon`)
  function analize() {
    const rules = grammar.split('\n');
    console.log(rules);
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
