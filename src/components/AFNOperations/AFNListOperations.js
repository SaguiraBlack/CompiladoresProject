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
            <AFNOperationsLink to={`${this.props.url}/Optional`} label='Opcional' />
	    </div>
        );
    }
}

export default AFNListOperations;