import React from "react";
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="bg-blue flex">
                <Link to="/">
                    <div className="m-auto ml-0 text-xl px-8 py-5 text-white font-semibold">
                        <h1>Compiladores</h1>
                    </div>
                </Link>
                <div className="m-auto mr-0 text-xl px-8 py-5 text-white font-semibold">
                    <h1>Proyectos</h1>
                </div>
            </nav>
        );
    }
}

export default Navbar;