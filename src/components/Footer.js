import React from "react";
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-gray fixed bottom-0 w-full flex
                               px-8 py-2 text-white font-semibold">
                <div className="absolute inset-y-0 flex">
                    <span className="m-auto text-xl">Github</span>
                </div> 
                <div className="m-auto text-lg">
                    <h1>Copyright</h1>
                </div>
            </footer>
        );
    }
}

export default Footer;