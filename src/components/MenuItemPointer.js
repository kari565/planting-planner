import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';

function MenuItemPointer(props) {
  const mediaQueryMaxW = window.matchMedia('(max-width: 400px)');
  const [isVertical, setIsVertical] = useState(document.body.offsetWidth <= 400);
  const [style, setStyle] = useState({});
  
  const delayedCallback = style => debounce(() => {setStyle(style);}, 300);

  const setStyleProps = () => {
    var refItem = (typeof props.activeItemRef === 'string') ? document.getElementById(props.activeItemRef) : props.activeItemRef;
    var color = window.getComputedStyle(refItem).getPropertyValue('background-color');
    if (isVertical) {
      var property = 'top';
      var position = refItem.offsetTop;
    } else {
      var property = 'left';
      var position = refItem.offsetLeft;
    }
    
    setStyle({
      [property]: position,
      backgroundColor: color
    });
  }

  useEffect(() => setStyleProps(), [props.activeItemRef]);

  useEffect(() => {   
    setStyleProps();
    delayedCallback(style);
  }, [isVertical]);

  useEffect(() => {
    var handleMediaQuery = (mediaQuery) => mediaQuery.matches ? setIsVertical(true) : setIsVertical(false);
    mediaQueryMaxW.addEventListener('change', handleMediaQuery);
    return () => mediaQueryMaxW.removeEventListener('change', handleMediaQuery);
  }, []);

  return (
    <span className='menu-item--active' style={style}/>
  )
}

MenuItemPointer.propTypes = {
  activeItemRef: PropTypes.string.isRequired
};

MenuItemPointer.defaultProps = {
  activeItemRef: document.getElementById('plants')
};

export default MenuItemPointer;