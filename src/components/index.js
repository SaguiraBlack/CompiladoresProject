import React from "react";
import {Link} from 'react-router-dom';
import PalaciosLugo from '../img/palacios.jpg';
import TovarEspejo from '../img/tovar.jpg';
import Project1 from '../img/project1.png';
import Project2 from '../img/project2.png';

function Index (){
        return (
            <div className="bg-white h-screen text-center">
                <section id="title" className="p-6 mt-20">
                    <h1 className="text-gray text-4xl font-bold p-1">Compiladores</h1>
                    <h2 className="text-gray text-2xl font-medium p-1">3CM16</h2>
                </section>
                <div className="flex flex-row justify-center items-center space-x-10" >
                    <Link to="/Operations">
                        <section id="projects" className="flex">
                            <article className="m-auto hover:opacity-70">
                                <div className="bg-gray-light m-auto w-60 h-32 rounded-t-lg">
                                    <img src={Project1} alt="Project 1" className="w-full overflow-hidden m-auto"/>
                                </div>
                                <div className="bg-blue text-white font-semibold p-1">
                                    Autómatas Finitos
                                </div>
                            </article>
                        </section>
                    </Link>
                    <Link to="/SintacticAnalizer">
                        <section id="projects" className="flex">
                            <article className="m-auto hover:opacity-70">
                                <div className="bg-gray-light m-auto w-60 h-32 rounded-t-lg">
                                    <img src={Project2} alt="Project 2" className="w-full overflow-hidden m-auto"/>
                                </div>
                                <div className="bg-blue text-white font-semibold p-1">
                                    Analizador Sintactico
                                </div>
                            </article>
                        </section>
                    </Link>
                </div>
                <section id="students" className="flex pt-10">
                    <article className="m-auto mr-5">
                        <div className="bg-gray-light w-40 h-40 rounded-full overflow-hidden m-auto">
                            <a href="https://github.com/alan-palacios" target="_blank">
                                <img src={PalaciosLugo} alt="Palacios Lugo" className="w-full"/>
                            </a> 
                        </div>
                        <div>
                            <h3 className="text-gray font-medium text-lg">Palacios Lugo Alan Yoltic</h3>
                        </div>
                    </article>
                    <article className="m-auto ml-5">
                        <div className="bg-gray-light w-40 h-40 rounded-full overflow-hidden m-auto">
                        <a href="https://github.com/SaguiraBlack" target="_blank">
                            <img src={TovarEspejo} alt="Tovar Espejo" className="w-full"/>
                        </a>
                        </div>
                        <div>
                            <h3 className="text-gray font-medium text-lg">Tovar Espejo M. Josefina</h3>
                        </div>
                    </article>
                </section>
            </div>
        );
}

export default Index;