import React from "react";
import {Link} from 'react-router-dom';
import PalaciosLugo from '../img/palacios.jpg';
import TovarEspejo from '../img/tovar.jpg';

class Index extends React.Component {
    render() {
        return (
            <div className="bg-white h-screen">
                <section id="title" className="p-6">
                    <h1 className="text-gray text-4xl font-bold p-1">Compiladores</h1>
                    <h2 className="text-gray text-2xl font-medium p-1">3CM16</h2>
                </section>
                <Link to="/Operations">
                    <section id="projects" className="flex">
                        <article className="m-auto">
                            <div className="bg-gray-light m-auto w-60 h-32 rounded-t-lg"/>
                            <div className="bg-blue text-white font-semibold p-1">
                                Proyecto 1
                            </div>
                        </article>
                    </section>
                </Link>
                <section id="students" className="flex pt-10">
                    <article className="m-auto mr-5">
                        <div className="bg-gray-light w-40 h-40 rounded-full overflow-hidden m-auto">
                            <img src={PalaciosLugo} alt="Palacios Lugo" className="w-full"/>
                        </div>
                        <div>
                            <h3 className="text-gray font-medium text-lg">Palacios Lugo Alan Yoltic</h3>
                        </div>
                    </article>
                    <article className="m-auto ml-5">
                        <div className="bg-gray-light w-40 h-40 rounded-full overflow-hidden m-auto">
                            <img src={TovarEspejo} alt="Tovar Espejo" className="w-full"/>
                        </div>
                        <div>
                            <h3 className="text-gray font-medium text-lg">Tovar Espejo M. Josefina</h3>
                        </div>
                    </article>
                </section>
            </div>
        );
    }
}

export default Index;