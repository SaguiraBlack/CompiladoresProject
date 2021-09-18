import React from "react";
import AFNOperationsLink from "./AFNOperationsLink";

class AFNListOperations extends React.Component {

    render() {
        return (
        <div className="w-1/5 bg-gray-light pt-6  text-left flex-col">
			<h2 className="text-blue font-semibold pl-8 pb-3 text-lg">Funciones</h2>
            <AFNOperationsLink to={`${this.props.url}/Basic`} label='Básico' />
            <AFNOperationsLink to={`${this.props.url}/Join`} label='Unir' />
            <AFNOperationsLink to={`${this.props.url}/Concat`} label='Concatenar' />
            <AFNOperationsLink to={`${this.props.url}/ClosurePlus`} label='Cerradura +' />
            <AFNOperationsLink to={`${this.props.url}/ClosureStar`} label='Cerradura *' />
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Optional' />
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Expresion Regular a AFN' />
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Union P/Analizador Léxico' />
            <AFNOperationsLink to={`${this.props.url}/AFNtoAFD`} label='AFN a AFD' />
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Analizar Cadena' />
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Probar Analizador Léxico' />
	    </div>
        );
    }
}

export default AFNListOperations;