import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AFNFactory from "../../AFN/AFNFactory";
import { addAFN } from "../../app/slices/AFNSlice";
import ClosurePlusImg from '../../img/closurePlus.png';

function ClosurePlus () {
    const [name, setName] = useState('');
    const [afn1, setAfn1] = useState(0);
    const dispatch = useDispatch();
  	const AFNListData = useSelector(state=>  state.AFNlist.value);

    function submitAFN() {
        const AFN1 = AFNFactory.copyAFN(JSON.parse(AFNListData[afn1].afn));
        const closurePlus = AFNFactory.closurePlus(AFN1);
        dispatch(addAFN({
            name,
            afn: JSON.stringify(closurePlus)
        }))
    }      

    return (
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Cerradura +
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 ml-0">
                    <input type="text" placeholder="Cerradura+1" className="ring-1 ring-gray-middle m-auto p-1 rounded"
                        onChange={e => setName(e.target.value)}>
                    </input>
                </article>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                    <label for="AFN1" className="text-gray-middle">AFN1:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                        onChange={e => setAfn1(e.target.value)}>
                        {AFNListData.map((element, i)=>{
                            return(
                                <option value={i} key={i}>{element.name}</option>
                            )
                        })}        
                    </select>
                </article>
            </section>
            <div className="w-auto h-auto grid justify-items-center p-10">
                <img src={ClosurePlusImg} alt='ClosurePlus'></img>
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

export default ClosurePlus;