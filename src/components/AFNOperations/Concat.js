import React from "react";
import ConcatImg from '../../img/concat.png';

class Concat extends React.Component {
    render() {
        return(
            <div className="text-center mt-6 mx-36">
                <h1 className="text-gray font-bold text-2xl text-left py-5">
                    Concatenar
                </h1>
                <section className="flex">
                    <article className="m-auto mb-0 ml-0">
                        <input type="text" placeholder="Concatenación1" className="ring-1 ring-gray-middle m-auto p-1 rounded">
                        </input>
                    </article>
                    <article className="m-auto mb-0 mr-0 w-1/2 text-left">
                        <label for="AFN1" className="text-gray-middle">AFN1:</label>
                        <select name="AFN1" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full">
                            <option value="prueba1">Prueba 1</option>
                            <option value="prueba2">Prueba 2</option>
                        </select>
                        <label for="AFN2" className="text-gray-middle">AFN1:</label>
                        <select name="AFN2" className="ring-1 ring-gray-middle m-auto p-1 rounded my-1 w-full">
                            <option value="prueba1">Prueba 1</option>
                            <option value="prueba2">Prueba 2</option>
                        </select>
                    </article>
                </section>
                <div className="w-auto h-auto grid justify-items-center p-10">
                    <img src={ConcatImg} alt='Basic'></img>
                </div>
                <div>
                    <button className="bg-white text-blue ring-blue ring-1 font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:text-white hover:shadow-lg">
                        Cancelar
                    </button>
                    <button className="bg-blue text-white font-semibold rounded-md p-1 w-1/4 m-3 hover:bg-gray hover:shadow-lg">
                        Crear
                    </button>
                </div>
            </div>
        );
    }
}

export default Concat;