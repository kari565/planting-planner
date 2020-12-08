import React from 'react';
import PropTypes from 'prop-types';
import VegPatchRect from './VegPatchRect';

function VegPatchContainer(props) {
    const handleClick = activePatch => {
        return e => {
            e.preventDefault();
            props.sendActivePatch(activePatch);
            props.sendDisplay("patch details");
        }
    }
    const vegPatches = props.vegPatches.map(patch => 
        <VegPatchRect patch={patch} key={patch.name} handleClick={handleClick}/>)

    return (
        <div className="vegPatchContainer">
            {vegPatches}
        </div>
    )
}

VegPatchContainer.propTypes = {
    vegPatches: PropTypes.array.isRequired, 
    sendActivePatch: PropTypes.func.isRequired,
    sendDisplay: PropTypes.func.isRequired
};

export default VegPatchContainer;