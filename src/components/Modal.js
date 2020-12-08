import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
    if (!props.visible){     
        return null;
    }

    return (
        <div className="modal">
            {props.children}
            <div className="buttonContainer">
                <button className="patchButton" onClick={props.sendState(true)}>OK</button>
                <button className="patchButton" onClick={props.sendState(false)}>Anuluj</button>
            </div>
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired, 
    sendState: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
    visible: false
};

export default Modal;