import React from 'react';
import PropTypes from 'prop-types';

function VegPatchRect(props) {
    const patch = props.patch;
    const sumFulfillment = () => patch.vegetables.reduce((count, veg) => count + veg.fulfillment, 0);

    const fulfillment = sumFulfillment();
    const patchHeightStyle = {
        height: patch.height * 100,
        lineHeight: patch.height * props.pxMultiplier + "px",
        left: patch.width * props.pxMultiplier + 11
    }

    const patchStyle = {
        width: patch.width * props.pxMultiplier,
        height: patch.height * props.pxMultiplier,
        background: `linear-gradient(110deg, #EBD700, #DEB33E ${fulfillment}%, white 0%)`
    }

    var uniqueVegs = patch.vegetables.filter((veg, index, array) => array.map(veg => veg.name).indexOf(veg.name) === index)
    const vegetables = uniqueVegs.map((veg) => <span key={veg.name}>{veg.name}</span> );
    
    return (
        <div className="vegPatch" style={patchStyle} onClick={props.handleClick(patch)}>        
            <div className="vegPatchText">{vegetables}</div>
            <div className="vegPatchWidth" >{patch.width + "m"}</div>
            <div className="vegPatchHeight" style={patchHeightStyle}>{patch.height + "m"}</div>
        </div>
    )
}

VegPatchRect.propTypes = {
    patch: PropTypes.object.isRequired, 
    pxMultiplier: PropTypes.number,
    handleClick: PropTypes.func.isRequired
};
  
VegPatchRect.defaultProps = {
    patch: {
        name: 'Nieznana',
        width: 2,
        height: 2,
        vegetables: []
    },
    pxMultiplier: 100
}

export default VegPatchRect;