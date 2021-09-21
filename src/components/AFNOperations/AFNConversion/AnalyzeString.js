import React, { useState } from "react";
import AFNConverter from "../../../AFN/AFNConverter";
import LexicalAnalizer from "../../../AFN/LexicalAnalizer";
import OptionalImg from '../../../img/optional.png';

function AnalyzeString (props){
    const [string, setString] = useState('');
    const [afd, setAfd] = useState(-1);

    function analyzeString() {
        if(afd<0) return;
        const AFD = props.myAFNs[afd].afn;
        console.log(AFD);
        const afdTable = AFNConverter.getAFDTable(AFD);
        const lexTable = LexicalAnalizer.analizeString(afdTable, string);
        console.log(lexTable);
    }      

    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Analizar Cadena
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="Cadena" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                            onChange={e => setString(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                    <label htmlFor="AFN1" className="text-gray-middle">AFN1:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                            onChange={e => setAfd(e.target.value)}>
                            <option value={-1} key={-1}>Selecciona un AFD</option>
                                {props.myAFNs.map((element, i)=>{
                                    if(element.afn.isAFD){
                                        return(
                                            <option value={i} key={i}>{element.name}</option>
                                        )
                                    }else return '';
                                })}
                    </select>
                </article>
            </section>
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={OptionalImg} alt='Basic'></img>
            </div>
            <div>
                <button className="bg-white text-blue ring-blue ring-1 font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:text-white hover:shadow-lg">
                    Cancelar
                </button>
                <button className="bg-blue text-white font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:shadow-lg"
                    onClick={analyzeString}>
                    Analizar
                </button>
            </div>
        </div>
    );
}

export default AnalyzeString;