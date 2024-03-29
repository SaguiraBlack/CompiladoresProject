import React, { useState } from "react";
import AFNConverter from "../../../AFN/AFNConverter";
import AFNtoAFDImg from '../../../img/afn-to-afd.png';

function AFNtoAFD (props){
    const [name, setName] = useState('');
    const [afn1, setAfn1] = useState(0);
    function submitAFN() {
        const AFN1 = props.myAFNs[afn1].afn;
        const afnName =props.myAFNs[afn1].name; 
        const afd = AFNConverter.convertAFNtoAFD(AFN1);
        props.pushAFN(validName(afnName), afd);
        console.log(afd);
        console.log(AFNConverter.getAFDTable(afd));
    }      
    const validName=(afnName)=>name===''?'AFD '+afnName:name;
    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                AFN a AFD
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="Opcional1" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                            onChange={e => setName(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                    <label htmlFor="AFN1" className="text-gray-middle">AFN1:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                            onChange={e => setAfn1(e.target.value)}>
                                {props.myAFNs.map((element, i)=>{
                                    return(
                                        <option value={i} key={i}>{element.name}</option>
                                    )
                                })}
                    </select>
                </article>
            </section>
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={AFNtoAFDImg} alt='AFN to AFD'></img>
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

export default AFNtoAFD;