import React from "react";
import { Icon } from '@iconify/react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-gray fixed bottom-0 w-full flex
                               px-8 py-2 text-white">
                <a href="https://github.com/SaguiraBlack/CompiladoresProject" target="_blank">
                    <div className="absolute bottom-0 inset-y-0 flex">
                        
                            <div className="m-auto pr-3">
                                    <Icon icon="akar-icons:github-fill" width="20" /> 
                            </div>
                            <span className="m-auto text-sm font-semibold">GitHub</span>
                    
                    </div>  
                </a>
                <div className="m-auto text-sm">
                    <h1>Developed by: Alan Palacios & Josefina Tovar. 2021</h1>
                </div>
            </footer>
        );
    }
}

export default Footer;