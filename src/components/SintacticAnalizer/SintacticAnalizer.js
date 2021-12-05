import React, { useState} from 'react';
import AFNConverter from '../../AFN/AFNConverter';
import LexicalAnalizer from '../../AFN/LexicalAnalizer';
import useAFNs from '../../context/useAFNs';
import GrammarFactory from '../../Gramatica/GrammarFactory';

import AllAFN from '../AllAFN';
import Button from '../Button';

function SintacticAnalizer (){
  const [afdTable] = useState([]);
  const [LRTable, setLRTable] = useState([]);
  const [sintacticTable, setSintacticTable] = useState([]);
  const [LRTableSymbols, setLRTableSymbols] = useState([]);
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
      let lxTable =LexicalAnalizer.analizeString(afdTable, sigma).filter(element=>
        element[0]!==0
      ); 
      augmentedGrammar.terminalsStructure.forEach(obj => {
        lxTable.forEach(element => {
          if(obj.symbol===element[1]){
            obj.token = element[0]
          } 
        });
      });
      //console.log(lxTable);
      setLexTable(lxTable);
  }      

  function updateAFD(i) {
      setAfd(i);
      if (i<0)return;
  }
  function analize() {
    const items = [{state: "E", word: 'E.+T' }, {state: "E", word: 'E.-T' }, {state: "E", word: '.T' }]
    const augmentedGrammar = GrammarFactory.createGrammar(grammar);
    const goToItems = augmentedGrammar.goTo(items, '-')

    const follow = augmentedGrammar.follow("F");
    console.log(follow);

    console.log(augmentedGrammar);
    setAugmentedGrammar(augmentedGrammar)
    setLRTableSymbols(augmentedGrammar.terminals.concat(augmentedGrammar.noTerminals).concat(['$']));
    const lrtable =GrammarFactory.getLRTable(augmentedGrammar) 
    setLRTable(lrtable);
    console.log(lrtable);
  }


  function sintacticAnalisis() {
    const sintctable = GrammarFactory.getSintacticTable( LRTable, augmentedGrammar, lexTable);
    setSintacticTable(sintctable);
    console.log(sintctable);
  }
  function setToken(value, i) {
    let grammarClone =  {...augmentedGrammar};  
    grammarClone.terminalsStructure[i].token=parseInt(value)
    setAugmentedGrammar(grammarClone)
  }

  return (
    <div className="flex pt-16 h-screen pb-20 mb-28 relative">
      <div className="bg-white w-4/5">
        <h1 className="text-gray font-bold text-4xl p-6 text-center">
          Análisis LR(1)
        </h1>
        <section id="bigContainer" className="flex mr-5">
          <article id="1stHalf" className="flex-col w-1/2">
            <div id="grammarAndTerminals" className="flex">
              <div id="grammar" className="flex-col ml-10">
                <div>
                  <textarea className='bg-gray-light rounded-sm p-5' rows={10} cols={21} 
                  value={grammar} onChange={e=>setGrammar(e.target.value)} 
                  spellCheck="false"/>
                </div>
                <div className="items-end text-right">
                  <Button label="1. Crear" onClick={analize} className=""/>
                </div>
              </div>
              <div id="terminals" className="ml-10">
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
                  2. Asignar tokens
                </div>
              </div>
            </div>
            <div id="sigma" className="flex-col ml-10">
              <div>
                <h2 className="text-gray font-bold text-2xl my-5">
                  Analizar Sintácticamente sigma
                </h2>
              </div>
              <div>
                <h2 className="text-gray font-bold text-xl py-2">
                  Seleccionar AFD
                </h2>
                <label htmlFor="AFN1" className="text-gray-middle">AFD:</label><br/>
                <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-1/2"
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
                <Button label="3. Probar Léxico" onClick={analyzeString} />
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
            </div>
          </article>
          <article id="2ndHalf" className="flex-col w-1/2">
            <div id="table1">
              <h2 className="text-gray font-bold text-xl">
                Crear Tabla
              </h2>
              <div>
                Tabla LR(1)
              </div>
              <div className="w-auto h-auto grid justify-items-center p-10">
                  <table className="divide-y divide-gray w-full">
                      <thead >
                          <tr >
                              <th className="p-1">No Terminal</th>
                              {augmentedGrammar && LRTableSymbols.map((symb, i)=>{
                                return <th key={i} className="px-2 border-2">{symb}</th>
                              })}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-middle">
                          {LRTable.map((obj, i)=>{
                              return(
                                  <tr key={i}>
                                    <td className="p-1">{i}</td>
                                    {augmentedGrammar && LRTableSymbols.map((symb, i)=>{
                                      let state = ''
                                      const haveTransition = obj.transitions.concat(obj.reductions).some(element => {
                                        if(element==null)return
                                        state = element.state;
                                        return element.symbol===symb;
                                      });
                                      if(haveTransition){
                                          return <th key={i} className="px-2 border-2">{state}</th>
                                      }else{
                                        return <th key={i} className="px-2 border-2"></th>
                                      }
                                    })}
                                  </tr>
                              )
                          })}
                      </tbody>
                  </table>
              </div>
            </div>
            <div id="table2">
            <div className="w-full h-auto grid justify-items-center overflow-x-scroll mb-32">
                <Button label="4. Analizar sintácticamente" onClick={sintacticAnalisis}/>
                <table className="divide-y divide-gray w-full">
                    <thead >
                        <tr>
                            <th className="p-1">Pila</th>
                            <th className="p-1">Cadena</th>
                            <th className="p-1">Accion</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-middle">
                        {
                            sintacticTable?.map((element, index) => {
                                return(
                                    <tr key={index}>
                                        <td className="p-2">
                                            {element.pila}
                                        </td>
                                        <td className="p-2">
                                            {element.cadena}
                                        </td>
                                        <td className="p-2">
                                            {element.accion}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
              </div>
            </div>
          </article>
        </section>
      </div>
      <AllAFN/>
    </div>
  )
}

export default SintacticAnalizer;
