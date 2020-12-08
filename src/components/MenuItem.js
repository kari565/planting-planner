import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function MenuItem(props) {
  const itemRef = useRef();

  return (
    <div className='menu-item' id={props.item.key} ref={itemRef} onClick={props.handleClick(props.item.key, itemRef)}>
      {props.item.text.toUpperCase()}
    </div>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default MenuItem;