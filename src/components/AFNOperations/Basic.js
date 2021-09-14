import React, { useState } from "react";
import BasicImg from '../../img/basic.png';
import AFNFactory from '../../AFN/AFNFactory';
import { useDispatch } from "react-redux";
import { addAFN } from "../../app/slices/AFNSlice";

function Basic(props){
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    function submitAFN() {
        const afn1 = AFNFactory.createBasicAFN(symbol);
        props.pushAFN(name, afn1);
    }

    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Básico
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded" 
                            onChange={e => setName(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0">
                    <input type="text" placeholder="Símbolo" className="ring-1 ring-gray-middle m-auto p-1 rounded" maxLength="1"
                            onChange={e => setSymbol(e.target.value)} >
                    </input>
                </article>
            </section>
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={BasicImg} alt='Basic'></img>
            </div>
            <div>
                <button className="bg-white text-blue ring-blue ring-1 font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:text-white hover:shadow-lg">
                    Cancelar
                </button>
                <button className="bg-blue text-white font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:shadow-lg"
                        onClick={()=>submitAFN()}>
                    Crear
                </button>
            </div>
        </div>
    );
}

export default Basic;