import React from 'react';
import PropTypes from 'prop-types';

function PlantItem(props) {
  const API = 'http://plant-data-provider.herokuapp.com/';

  return (
    <div className='plant-item' id={props.item.name} onClick={props.handleClick(props.item.name)}>
      <img className='img-fluid' src={API + props.item.img} width="290" alt="Plant" />
      <div className='product-details'>
        <div className='product-name'>{props.item.name.toUpperCase()}</div>
        {!props.minimal && <div>
            <div className='product-detail'>Termin siewu: {props.item.sowingDate}</div> 
            <div className='product-detail'>Czas wzrostu: {props.item.vegetationDuration}</div>  
            <div className='product-detail'>Długość zbioru: {props.item.harvestDuration}</div>
        </div>}
      </div>
    </div>
  )
}

PlantItem.propTypes = {
  minimal: PropTypes.bool, 
  item: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

PlantItem.defaultProps = {
  minimal: false,
  item: {
    text: '-',
    sowingDate: '-',
    vegetationDuration: '-',
    harvestDuration: '-'
  }
};
  
export default PlantItem;