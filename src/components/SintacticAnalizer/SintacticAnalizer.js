import React, { useState} from 'react';
import useAFNs from '../../context/useAFNs';
import GrammarFactory from '../../Gramatica/GrammarFactory';

import AllAFN from '../AllAFN';
import Button from '../Button';

function SintacticAnalizer (){
  const [afdTable, setAfdTable] = useState([]);
  const [sigma, setSigma] = useState('');
  const [myAFNs, setMyAFNs] = useAFNs();
  const [grammar, setGrammar] = useState(
`E->E + T|E - T|T
T->T * F|T / F|F
F->( E )|num`)
  const items = [{state: "E", word: 'E.+T' }, {state: "E", word: 'E.-T' }, {state: "E", word: '.T' }]
  const [afd, setAfd] = useState(-1);
  const [augmentedGrammar, setAugmentedGrammar] = useState(null)

  function updateAFD(i) {
      setAfd(i);
      if (i<0)return;
  }
  function analize() {
    const augmentedGrammar = GrammarFactory.createGrammar(grammar);
    const goToItems = augmentedGrammar.goTo(items, '-')
    console.log(augmentedGrammar);
    console.log(goToItems);
    setAugmentedGrammar(augmentedGrammar)
  }

  function setToken(value, i) {
    let grammarClone =  {...augmentedGrammar};  
    grammarClone.terminalsStructure[i].token=parseInt(value)
    console.log(grammarClone);
    setAugmentedGrammar(grammarClone)
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
          <Button label="Crear" onClick={analize} />
          <div className="flex flex-row space-x-10 justify-center">
            <div className="flex flex-col" >
              No Terminales
              {augmentedGrammar && augmentedGrammar.noTerminals?.map((symbol, i)=>{
                return <span key={i}>{symbol}</span>
              })}
            </div>
            <div className="flex flex-col" >
              Terminales
              {augmentedGrammar && augmentedGrammar.terminalsStructure?.map((object, i)=>{
                return (
                  <div key={i}>
                    <span >{object.symbol}</span>
                    <input type="text" placeholder="token" className="ring-1 ring-gray-middle m-auto p-1 rounded w-32 mx-5" 
                            onChange={e => setToken(e.target.value, i)} value={object.token}>
                    </input>
                  </div>
                )
              })}
            </div>
            <Button label="Asignar tokens" />
          </div>
        </div>
        <article className="m-auto mb-0 mr-0 w-1/2 text-left">
            <h2 className="text-gray font-bold text-2xl p-6">
              Seleccionar AFD
            </h2>
            <label htmlFor="AFN1" className="text-gray-middle">AFD:</label>
            <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                    onChange={e => updateAFD(e.target.value)}>
                    <option value={-1} key={-1}>Selecciona un AFD</option>
                        {myAFNs.map((element, i)=>{
                            if(element.afn.isAFD){
                                return(
                                    <option value={i} key={i}>{element.name}</option>
                                )
                            }else return '';
                        })}
            </select>
        </article>
        <div>
            <h2 className="text-gray font-bold text-2xl p-6">
              Creat Tabla
            </h2>
          <Button label="Creat Tabla" onClick={analize} />
          <span>Tabla LL(1)</span>
          <div>

          </div>
        </div>
        <div>
            <h2 className="text-gray font-bold text-2xl p-6">
              Analizar Sintácticamente sigma
            </h2>
            <article className="m-auto mb-0 ml-0">
              Sigma
                <input type="text" placeholder="SIGMA" className="ring-1 ring-gray-middle m-auto p-1 rounded" 
                        onChange={e => setSigma(e.target.value)} value={sigma}>
                </input>
            </article>
            <article>
              <Button label="Probar Léxico" />
            <div className="w-auto h-auto grid justify-items-center p-10 overflow-x-scroll">
              <table className="divide-y divide-gray w-full">
                  <thead >
                      <tr>
                          <th className="p-1">Lexema</th>
                          <th className="p-1">Token</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-middle">
                  </tbody>
              </table>
            </div>

            </article>
            <div className="w-auto h-auto grid justify-items-center p-10 overflow-x-scroll">
              <Button label="Analizar sigma" />
              <table className="divide-y divide-gray w-full">
                  <thead >
                      <tr>
                          <th className="p-1"></th>
                          <th className="p-1">Pila</th>
                          <th className="p-1">Cadena</th>
                          <th className="p-1">Accion</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-middle">
                      {/*lexTable.map((obj, i)=>{
                          return(
                              <tr key={i}>
                                  <td className="p-1">{obj[1]}</td>
                                  <td className="p-1">{obj[0]}</td>
                              </tr>
                          )
                      })*/}
                      {
                          afdTable?.map((element, index) => {
                              return(
                                  <tr key={index}>
                                      <td className="p-2">
                                          {index}
                                      </td>
                                      {
                                          element?.map((element, index) => {
                                              return(
                                                  <td className="p-2" key={index}>
                                                      {element}
                                                  </td>
                                              );
                                          })
                                      }
                                  </tr>
                              );
                          })
                      }
                  </tbody>
              </table>
            </div>
        </div>
      </div>
      <AllAFN />
    </div>
  )
}

export default SintacticAnalizer;
