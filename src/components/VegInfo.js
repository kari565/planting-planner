import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function VegInfo(props) {
    const [fulfillment, setFulfillment] = useState(0);

    useEffect(() => setFulfillment(props.veg.fulfillment), [props.veg.fulfillment], [props.totalFulFillment]);
    
    const handleChange = e => {
        e.preventDefault();
        var inputVal = e.target.value;
        var totalFulfillment = parseInt(props.totalFulFillment) - fulfillment + (inputVal === "" ? 0 : parseInt(inputVal));
        if (totalFulfillment <= 100 ) {
            setFulfillment(inputVal);
            props.setVegInfo(totalFulfillment, props.veg, inputVal);
        }
    }

    const handleBlur = e => {
        if (e.target.value === "") {
            var totalFulfillment = parseInt(props.totalFulFillment) - fulfillment;
            props.setVegInfo(totalFulfillment, props.veg, 0);
            setFulfillment("0"); 
        }
    }

    return (
        <div className="vegInfo row">
            <div className="left">
                <label className="vegName">{props.veg.name + ":"}</label>
                <div className="vegFulfillment">
                    <input value={fulfillment} type="number" min="0" 
                    max="100" onChange={handleChange} onBlur={handleBlur} disabled={props.disabled}></input>
                    %
                </div> 
            </div>
            <div className="right">
                <span className="plantingDate">{props.veg.plantingDate}</span>
            </div>
        </div>
    )
}

VegInfo.propTypes = {
    veg: PropTypes.object.isRequired, 
    totalFulFillment: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    setVegInfo: PropTypes.func.isRequired
};
  
VegInfo.defaultProps = {
    veg: {
        name: '-',
        fulfillment: 0,
        plantingDate: '-'
    },
    totalFulFillment: 0,
    disabled: false
};

export default VegInfo;