import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VegInfo from './VegInfo';

function VegPatchInfo(props) {
    const [patch, setPatch] = useState(props.patch); 
    const [changeOn, setChangeOn] = useState(false);
    const [saveOn, setSaveOn] = useState(false);

    const editButtonToggle = { false: "Edytuj", true: "Zapisz" };
    const addButtonToggle = { false: "Dodaj", true: "Wróć" };

    useEffect(() => { props.sendLeftPanel(saveOn) }, [saveOn]);

    const toggleState = (state, stateSetter) => {
        if (state) {
            props.sendPatch(props.patch);
        }
        stateSetter(!state);
    }

    const handleSave = e => {
        e.preventDefault();
        toggleState(saveOn, setSaveOn);
    }

    const handleEdit = e => {
        e.preventDefault();
        toggleState(changeOn, setChangeOn);
    }

    const sumFulfillment = patch => patch.vegetables.reduce((count, veg) => count + veg.fulfillment, 0);

    const validateNumInput = input => {
        if (input === "" || isNaN(input)) {
            input = 0;
        }
        return input;
    }

    const getVegInfo = (totalFulfillment, veg, fulfillment) => {  
        fulfillment = validateNumInput(fulfillment);
        var patch = JSON.parse(JSON.stringify(props.patch));
        patch.vegetables.find(item => item.name === veg.name 
            && item.plantingDate === veg.plantingDate).fulfillment = parseInt(fulfillment);
        setPatch(patch);
        props.sendCurPatch(patch);
    }
    
    const vegItems = props.patch.vegetables.map(item => <VegInfo veg={item} key={item.name + item.plantingDate}
            totalFulFillment={sumFulfillment(props.patch)} disabled={!changeOn} setVegInfo={getVegInfo}/>);
 
    return (
        <div className="vegPatchInfo">
            <h4 className="name">{patch.name}</h4>
            <div className="fulfillment">Zajęte: {sumFulfillment(props.patch)}%</div>
            {vegItems}
            <div className="buttonContainer">
                <button className="patchButton" onClick={handleSave} disabled={changeOn}>{addButtonToggle[saveOn]}</button>
                <button className="patchButton" onClick={handleEdit} disabled={saveOn}>{editButtonToggle[changeOn]}</button>
            </div>
        </div>
    )
}

VegPatchInfo.propTypes = {
    patch: PropTypes.object.isRequired, 
    sendPatch: PropTypes.func.isRequired,
    sendLeftPanel: PropTypes.func.isRequired,
    sendCurPatch: PropTypes.func.isRequired
};
  
VegPatchInfo.defaultProps = {
    patch: {
        name: 'Nieznana',
        width: 2,
        height: 2,
        vegetables: []
    }
};

export default VegPatchInfo;