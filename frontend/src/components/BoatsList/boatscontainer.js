import React from "react";
import Boat from './boat'

export default function BoatsContainer(props) {
    return (
        <div className="main-wrapper boat-list">
            {props.data.map(boat => {
                return <Boat boat={boat} />
            })}
        </div>
    );
};