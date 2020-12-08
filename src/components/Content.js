import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlantListContainer from './PlantListContainer';        
import VegPatchContainer from './VegPatchContainer';     
import VegPatchDetails from './VegPatchDetails'; 

function Content(props) {
    const [activePatch, setActivePatch] = useState(null);

    const getActivePatch = acPatch => setActivePatch(acPatch);
    const getDisplay = disp => props.sendDisplay(disp);
    const sendPatch = newPatch => props.sendPatch(newPatch);

    switch(props.display) {
        case "patches":
            return (
                <VegPatchContainer vegPatches={props.data.vegPatches} 
                sendActivePatch={getActivePatch} sendDisplay={getDisplay}/>
            )
        case "patch details":
            return (
                <VegPatchDetails patch={activePatch}  
                plantItems={props.data.plantItems} sendPatch={sendPatch}/>
            )
        case "plants":
        default:
            return (
                <PlantListContainer plantItems={props.data.plantItems}/> 
            )
    }
}

Content.propTypes = {
    display: PropTypes.string.isRequired, 
    data: PropTypes.object.isRequired,
    sendDisplay: PropTypes.func.isRequired,
    sendPatch: PropTypes.func.isRequired
};

Content.defaultProps = {
    display: 'plants'
};

export default Content;