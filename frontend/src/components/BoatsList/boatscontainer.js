import React from "react";
import Boat from './boat'
import Maps from '../Map/mapContainer';

export default function BoatsContainer(props) {
    return (
            <div className="main-wrapper boat-list grid-col-3">
                {props.data.length === 0
                    ? <p>Leider keine Boote gefunden</p>
                : <>
                        <Maps boatOverview={props.data} />
                        {
                            props.data.map(boat => {
                                return <Boat boat={boat} key={boat.id}/>
                            })
                        }
                    </>
                }
            </div>
    );
};