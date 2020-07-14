import React from "react";
import Boat from './boat'

export default function BoatsContainer(props) {
    console.log(props)
    return (
        <div className="main-wrapper">
            {props.data.map(boat => {
                return <Boat boat={boat} />
            })}
        </div>
    );
};