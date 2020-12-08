import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import VegPatchRect from './VegPatchRect';
import VegPatchInfo from './VegPatchInfo';
import PlantListContainer from './PlantListContainer';
import VegInfo from './VegInfo';
import Modal from './Modal'

function VegPatchDetails(props) {
    const [pxMultiplier, setPxMultiplier] = useState(100);
    const [leftContent, setLeftContent] = useState('patch');
    const [activePlant, setActivePlant] = useState('');
    const [additionModal, setAdditionModal] = useState(false);
    const [fulfillment, setFulfillment] = useState(0);
    const [totalFulfillment, setTotalFulfillment] = useState(0);
    const [node, setNode] = useState();
    const [patch, setPatch] = useState(JSON.parse(JSON.stringify(props.patch)));

    const handleResize = () => setPxMultiplier(node.getBoundingClientRect().width / props.patch.width * 0.8)

    useEffect(() => { setTotalFulfillment(sumFulfillment()); }, [patch]);

    const leftPanel = useCallback(node => {
        if (node) {
            setNode(node);
            setPxMultiplier(node.getBoundingClientRect().width / props.patch.width * 0.8);
            setTotalFulfillment(sumFulfillment());
            window.addEventListener("resize", handleResize, false);
        } else {
            window.removeEventListener("resize", handleResize);
        }
    }, [node]);
    
    const sumFulfillment = () => {
        if (fulfillment === "") {
            setFulfillment(0);
        }
        return patch.vegetables.reduce((count, veg) => count + veg.fulfillment, 0);
    }

    const getVegInfo = (totFulfillment, veg, fulfillment) => { 
        setFulfillment(fulfillment);
        setTotalFulfillment(totFulfillment);
    }

    const getPatch = newPatch => setPatch(newPatch);
    const sendPatch = newPatch => props.sendPatch(deleteZeroVeg(newPatch));
    const getLeftPanel = isPlantList => setLeftContent(isPlantList ? "plantList" : "patch");
    const isDateEqual = (date1, date2) => date1 === date2;
    const handlePatchClick = () => { return e => e.preventDefault(); }

    const getAdditionState = (addition) => {
        return e => {
            e.preventDefault();
            if (addition) {
                addNewVeg();
            }
            setAdditionModal(false);
            setFulfillment(0);
        }
    }

    const addNewVeg = () => {
        var newPatch = JSON.parse(JSON.stringify(patch));
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        var newVeg = { 
            name: activePlant, 
            fulfillment: parseInt(fulfillment), 
            plantingDate: new Date().toLocaleDateString("pl-PL", options) 
        }
        var newVegIndex = newPatch.vegetables.findIndex(veg => 
            veg.name === newVeg.name && isDateEqual(veg.plantingDate, newVeg.plantingDate));
        newVegIndex === -1 
            ? newPatch.vegetables.push(newVeg) 
            : newPatch.vegetables[newVegIndex].fulfillment += parseInt(fulfillment);
        var nonZeroVegs = deleteZeroVeg(newPatch);
        setPatch(nonZeroVegs);
        sendPatch(nonZeroVegs);
    }

    const deleteZeroVeg = (newPatch) => {
        var  zeroVegs = [];
        var  nonZeroVegs = [];
        for (let i = 0; i < newPatch.vegetables.length; i++) {
            newPatch.vegetables[i].fulfillment === 0 
                ? zeroVegs.push(newPatch.vegetables[i])
                : nonZeroVegs.push(newPatch.vegetables[i]);
        }
        newPatch.vegetables = nonZeroVegs;
        return newPatch;
    }

    const getActivePlant = activePlant => {
        setActivePlant(activePlant);
        setAdditionModal(true);
    }

    const veg = {name: activePlant, fulfillment: fulfillment, plantingDate: new Date().toLocaleDateString()};

    return (
        <div className="vegPatchDetails row">
            <Modal visible={additionModal} sendState={getAdditionState}>
                    <VegInfo veg={veg} totalFulFillment={totalFulfillment} disabled={false} setVegInfo={getVegInfo}/>
            </Modal>
            <div className="leftPanel" ref={leftPanel}>
                {leftContent === "patch" 
                    ? <VegPatchRect patch={patch} pxMultiplier={pxMultiplier} handleClick={handlePatchClick}/>
                    : <PlantListContainer plantItems={props.plantItems} sendActivePlant={getActivePlant} minimal={true}/> 
                }
            </div>
            <div className="rightPanel">
                <VegPatchInfo patch={patch} sendPatch={sendPatch} sendLeftPanel={getLeftPanel} sendCurPatch={getPatch}/>
            </div>
        </div>
    )
}

VegPatchDetails.propTypes = {
    patch: PropTypes.object.isRequired, 
    plantItems: PropTypes.array.isRequired,
    sendPatch: PropTypes.func.isRequired
};
  
VegPatchDetails.defaultProps = {
    patch: {
        name: 'Nieznana',
        width: 2,
        height: 2,
        vegetables: []
    }
};

export default VegPatchDetails;