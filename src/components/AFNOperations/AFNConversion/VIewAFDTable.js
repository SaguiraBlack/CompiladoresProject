import React, { useState } from "react";
import AFNConverter from "../../../AFN/AFNConverter";

function ViewAFDTable (props){
    const [afdTable, setAfdTable] = useState([]);

    function updateTable(i) {
        if(i<0) return;
        const AFD = props.myAFNs[i].afn;
        const afdTableG = AFNConverter.getAFDTable(AFD);
        setAfdTable(afdTableG);
        console.log(afdTableG);
    }      

    return(
        <div className="text-center mt-6 mx-36">
            <h1 className="text-gray font-bold text-2xl text-left py-5">
                Ver Tabla AFD
            </h1>
            <section className="flex">
                <article className="m-auto mb-0 mr-0 w-full text-left">
                    <label htmlFor="AFN1" className="text-gray-middle">AFN1:</label>
                    <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full"
                            onChange={e => updateTable(e.target.value)}>
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

            <div className="w-auto h-auto grid justify-items-center p-10 overflow-x-scroll">
                <table className="divide-y divide-gray w-full">
                    <thead >
                        <tr>
                            <th className="p-1"></th>
                                {
                                    afdTable[0]?.map((element, index) => {
                                        return(
                                            <th className="p-2">
                                                {index}
                                            </th>
                                        );
                                    })
                                }
                        </tr>
                        <tr>
                            <th className="p-1">State</th>
                            {
                                afdTable[0]?.map((element, index) => {
                                    return(
                                        <th className="p-2">
                                            {String.fromCharCode(index)}
                                        </th>
                                    );
                                })
                            }
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
                                    <tr>
                                        <td className="p-2">
                                            {index}
                                        </td>
                                        {
                                            element?.map((element, index) => {
                                                return(
                                                    <td className="p-2">
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
    );
}

export default ViewAFDTable;