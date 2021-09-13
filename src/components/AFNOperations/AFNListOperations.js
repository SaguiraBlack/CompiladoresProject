import React from "react";

class AFNListOperations extends React.Component {
    render() {
        return (
        <div className="w-1/5 bg-gray-light pt-6  text-left flex-col">
			<h2 className="text-blue font-semibold pl-8 pb-3 text-lg">Funciones</h2>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Básico</label>
            </div>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Unir</label>
            </div>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Concatenar</label>
            </div>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Cerradura +</label>
            </div>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Cerradura *</label>
            </div>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">Opcional</label>
            </div>
	    </div>
        );
    }
}

export default AFNListOperations;