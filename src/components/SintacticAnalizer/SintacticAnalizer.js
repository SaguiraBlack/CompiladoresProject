import React, { useState} from 'react';
import AFNConverter from '../../AFN/AFNConverter';
import LexicalAnalizer from '../../AFN/LexicalAnalizer';
import useAFNs from '../../context/useAFNs';
import GrammarFactory from '../../Gramatica/GrammarFactory';

import AllAFN from '../AllAFN';
import Button from '../Button';

function SintacticAnalizer (){
  const [afdTable] = useState([]);
  const [sigma, setSigma] = useState('2.54*(12-78)/(13+17)');
  const [myAFNs] = useAFNs();
  const [grammar, setGrammar] = useState(
`E->E + T|E - T|T
T->T * F|T / F|F
F->( E )|num`)
  //Select AFD
  const [afd, setAfd] = useState(-1);
  //Grammar
  const [augmentedGrammar, setAugmentedGrammar] = useState(null)

  //Probar Lexico
  const [lexTable, setLexTable] = useState([]);

  function analyzeString() {
      if(afd<0) return;
      const AFD = myAFNs[afd].afn;
      console.log(AFD);
      const afdTable = AFNConverter.getAFDTable(AFD);
      setLexTable(LexicalAnalizer.analizeString(afdTable, sigma));
  }      

  function updateAFD(i) {
      setAfd(i);
      if (i<0)return;
  }
  function analize() {
    const items = [{state: "E", word: 'E.+T' }, {state: "E", word: 'E.-T' }, {state: "E", word: '.T' }]
    const augmentedGrammar = GrammarFactory.createGrammar(grammar);
    const goToItems = augmentedGrammar.goTo(items, '-')
    console.log(augmentedGrammar);
    setAugmentedGrammar(augmentedGrammar)
    console.log(GrammarFactory.getLRTable(augmentedGrammar));
  }

  function setToken(value, i) {
    let grammarClone =  {...augmentedGrammar};  
    grammarClone.terminalsStructure[i].token=parseInt(value)
    setAugmentedGrammar(grammarClone)
  }

  return (
    <div className="flex pt-16 h-screen">
      <div className="bg-white w-4/5">
        <h1 className="text-gray font-bold text-4xl p-6 text-center">
          Análisis LR(1)
        </h1>

        <div className='flex'>
          <div className='flex-col w-1/4'>
            <div className="ml-10">
              <textarea className='bg-gray-light rounded-sm p-5' rows={10} cols={21} 
                value={grammar} onChange={e=>setGrammar(e.target.value)} 
                spellCheck="false"/>
            </div>
            <div className="items-end text-right">
              <Button label="Crear" onClick={analize} className=""/>
            </div>
          </div>

          <div className="w-1/5 flex-col pl-6">
              <h2 className="text-gray font-bold text-xl">
                No Terminales
              </h2>
              <div className="flex flex-col" >
                {augmentedGrammar && augmentedGrammar.noTerminals?.map((symbol, i)=>{
                  return (
                    <div key={i}>
                      <span >{symbol}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex flex-col overflow-y-scroll">
                <h2 className="text-gray font-bold text-xl">
                  Terminales
                </h2>
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
              <div className="items-end text-right">
                <Button label="Asignar tokens"/>
              </div>
          </div>

          <div className="w-2/5 flex-col pl-6">
            <h2 className="text-gray font-bold text-xl">
              Crear Tabla
            </h2>
            <div>
              Tabla LR(1)
            </div>
            <div className="items-end text-right">
              <Button label="Crear Tabla" onClick={analize}/>
            </div>   
            <div className="w-auto h-auto grid justify-items-center p-10">
                <table className="divide-y divide-gray w-full">
                    <thead >
                        <tr >
                            <th className="p-1">No Terminal</th>
                            {augmentedGrammar && augmentedGrammar.terminals.map((symb, i)=>{
                              return <th key={i}>{symb}</th>
                            })}

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-middle">
                        {lexTable.map((obj, i)=>{
                            return(
                                <tr key={i}>
                                    <td className="p-1">{obj[1]}</td>
                                    <td className="p-1">{obj[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
          </div>
        </div>


        <div className="flex">
          <div className="ml-10 w-2/6 flex-col">
            <div>
              <h2 className="text-gray font-bold text-2xl my-5">
                Analizar Sintácticamente sigma
              </h2>
            </div>
            <div>
              <h2 className="text-gray font-bold text-xl py-2">
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
              <article className="m-auto mb-0 ml-0 py-3">
                Sigma<br/>
                  <input type="text" placeholder="SIGMA" className="ring-1 ring-gray-middle m-auto p-1 rounded" 
                          onChange={e => setSigma(e.target.value)} value={sigma}>
                  </input>
              </article>
              <Button label="Probar Léxico" onClick={analyzeString} />
            </div>
          </div>

          <div className="w-1/6 h-auto grid justify-items-center p-10">
            <table className="divide-y divide-gray w-full">
                <thead >
                    <tr >
                        <th className="p-5">Lexema</th>
                        <th>Token</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-middle">
                    {lexTable.map((obj, i)=>{
                        return(
                            <tr key={i}>
                                <td className="p-1">{obj[1]}</td>
                                <td className="p-1">{obj[0]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
          </div>
          <div className="w-4/6 h-auto grid justify-items-center overflow-x-scroll">
              <Button label="Analizar sintácticamente"/>
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
      <AllAFN/>
    </div>
  )
}

export default SintacticAnalizer;
