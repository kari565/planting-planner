import React, { useState }from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import MenuItemPointer from './MenuItemPointer';

function MenuContainer(props) {
  const [activeItemRef, setActiveItemRef] = useState('plants');
  const menuItems = ([
    { key: 'patches', text: 'Grządki' },
    { key: 'plants', text: 'Rośliny' }
  ])  

  const handleClick = (activeItem, activeItemRef) => {
    return e => {
      e.preventDefault();
      setActiveItemRef(activeItemRef.current);
      props.sendDisplay(activeItem);
    }
  } 
  
  const menu = menuItems.map(item => <MenuItem item={item} key={item.key} handleClick={handleClick}/>);
  return (
    <div className='menu-container'>
      {menu}
      <MenuItemPointer activeItemRef={activeItemRef}/>
    </div>
  )
}

MenuContainer.propTypes = {
  sendDisplay: PropTypes.func.isRequired
};

export default MenuContainer;