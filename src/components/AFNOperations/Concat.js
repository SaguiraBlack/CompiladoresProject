import React, { useState } from "react";
import AFNFactory from "../../AFN/AFNFactory";
import ConcatImg from '../../img/concat.png';

function Concat (props) {
    const [name, setName] = useState('');
    const [afn1, setAfn1] = useState(0);
    const [afn2, setAfn2] = useState(0);

    function submitAFN() {

        const AFN1 = props.myAFNs[afn1].afn;
        const AFN2 = props.myAFNs[afn2].afn;
        const concatAFN = AFNFactory.concatAFN(AFN1, AFN2);
        props.pushAFN(validName(), concatAFN);
    }
    const validName=()=>name===''?'Concatenacion':name;

    return (
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Concatenar
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="Concatenación1" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                        onChange={e => setName(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                    <label for="AFN1" className="text-gray-middle">AFN1:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                        onChange={e => setAfn1(e.target.value)}>
                        {props.myAFNs.map((element, i)=>{
                            return(
                                <option value={i} key={i}>{element.name}</option>
                            )
                        })}
                    </select>
                    <label for="AFN2" className="text-gray-middle">AFN1:</label>
                    <select name="AFN2" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                        onChange={e => setAfn2(e.target.value)}>
                        {props.myAFNs.map((element, i)=>{
                            return(
                                <option value={i} key={i}>{element.name}</option>
                            )
                        })}
                    </select>
                </article>
            </section>
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={ConcatImg} alt='Concat'></img>
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

export default Concat;