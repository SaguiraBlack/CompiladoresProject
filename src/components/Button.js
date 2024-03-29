import React from "react";

function Button (props){
    return (
        <button className="bg-blue text-white font-semibold rounded-md p-1 w-auto m-3 hover:bg-gray hover:shadow-lg"
                onClick={props.onClick}>
                {props.label}
        </button>
    );
}
export default Button;