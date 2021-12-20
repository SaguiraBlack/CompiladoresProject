import React, { useState } from "react";
import AFNConverter from "../../../AFN/AFNConverter";
import RegexImg from '../../../img/regex.png';

function RegexToAFN (props){
    const [name, setName] = useState('');
    const [expression, setExpression] = useState('');
    function submitAFN() {
        const AFN = AFNConverter.convertRegexToAFN(expression);
        //console.log(AFN);
        props.pushAFN(validName(), AFN);
    } 
    const validName = ()=>name===''?'AFN Regex ':name;
    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Expresión Regular a AFN
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="Opcional1" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                            onChange={e => setName(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left ">
                    <label htmlFor="AFN1" className="text-gray-middle block">Expresion Regular</label>
                    <input type="text" placeholder="a|b" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                            onChange={e => setExpression(e.target.value)}>
                    </input>
                </article>
            </section>
            (, ), +, |, *, ?, _, 
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={RegexImg} alt='Regular Expression'></img>
            </div>
            <div>
                <button className="bg-white text-blue ring-blue ring-1 font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:text-white hover:shadow-lg">
                    Cancelar
                </button>
                <button className="bg-blue text-white font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:shadow-lg"
                    onClick={submitAFN}>
                    Crear
                </button>
            </div>
        </div>
    );
}

export default RegexToAFN;