import React from "react";
import { Link } from "react-router-dom";

function AFNOperationsLink(props) {
    return (
        <Link to={props.to}>
            <div className="w-full hover:bg-gray-middle p-3 pl-8 font-normal border-t-2 border-gray-middle flex">
                <label className="w-full m-auto">{props.label}</label>
            </div>
        </Link>
    );
}

export default AFNOperationsLink;