import React, { useState } from "react";
import TokenImg from '../../../img/token.png';

function AssignTokens (props){
    const [tokens, setTokens] = useState([]);
    const [afd, setAfd] = useState(-1);

    function updateTokens() {
        const AFD = props.myAFNs[afd].afn;
        AFD.acceptedStates.forEach(state => {
            state.token = tokens[state.id];
        });
        console.log(AFD);
    }      

    function updateAFD(i) {
        setAfd(i);
        if (i<0)return;
        const AFD = props.myAFNs[i].afn;
        setTokens(Array(AFD.states.length).fill(0));
    }

    function updateInput(token, id) {
        setTokens( arr=>{
            const newArr = [...arr];
            newArr[id]=parseInt(token);
            return newArr;
        });
    }

    function renderInputs() {
        const AFD =props.myAFNs[afd]?.afn; 
        if(AFD && AFD.isAFD && AFD.acceptedStates.length>0){
            return props.myAFNs[afd]?.afn.acceptedStates.map((state)=>{
                    return(
                        <div key={state.id} className="flex p-3">
                            <label className="pr-3">{state.id}</label>
                            <input type="text" placeholder="Token" className="ring-1 ring-gray-middle m-auto p-1 rounded" 
                                    onChange={e => updateInput(e.target.value, state.id)}>
                            </input>
                        </div>
                    )
                })
        }
    }

    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Assign Tokens
            </h1>
            <section className="flex">
                <div className="flex-col text-left ">
                    {afd!==-1?'Id':''}
                    {renderInputs()}
                </div>
                <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                    <label htmlFor="AFN1" className="text-gray-middle">AFD:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                            onChange={e => updateAFD(e.target.value)}>
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
                <img src={TokenImg} alt='Token'></img>
            </div>
            <div>
                <button className="bg-white text-blue ring-blue ring-1 font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:text-white hover:shadow-lg">
                    Cancelar
                </button>
                <button className="bg-blue text-white font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:shadow-lg"
                    onClick={updateTokens}>
                    Asignar
                </button>
            </div>
        </div>
    );
}

export default AssignTokens;