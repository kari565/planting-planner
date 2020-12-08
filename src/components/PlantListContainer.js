import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlantItem from './PlantItem';

function PlantListContainer(props) {
  const [season, setSeason] = useState(0);
  const [plantItems] = useState(props.plantItems);
  const filterItems = [
      { key: 0, text: 'Wszystkie' },
      { key: 1, text: 'Wiosna' },
      { key: 2, text: 'Lato' },
      { key: 3, text: 'Jesień' },
      { key: 4, text: 'Zima' },
    ]
  
  const getPlant = activeItem => {
    return e => {
      e.preventDefault()
      if (props.minimal) {
        props.sendActivePlant(activeItem);
      }
    }
  }

  const getSeason = season => {
    return e => {
      e.preventDefault();
      setSeason(season);
    }
  }

  const plantsSelected = season === 0 ? plantItems : plantItems.filter(item => item.harvestSeason.includes(season));
  const plants = plantsSelected.map(item => <PlantItem item={item} key={item._id} handleClick={getPlant} minimal={props.minimal}/>);
  const filtSeasons = filterItems.map(item => <button className={season === item.key ? 'season-item--active': 'season-item'}
    key={item.key} onClick={getSeason(item.key)}>{item.text.toUpperCase()}</button>);
  return (
    <div className='theme-tab'>
      <div className='season-list-container row'>
        {filtSeasons}
      </div>
      <div className='title-tab'>
          <div className='plant-list-container row'>
              <span className='plant-item--active'/>
              {plants}
          </div>
      </div>
    </div>
  )
}

PlantListContainer.propTypes = {
  minimal: PropTypes.bool, 
  plantItems: PropTypes.array.isRequired,
  sendActivePlant: PropTypes.func
};

PlantListContainer.defaultProps = {
   minimal: false
};

export default PlantListContainer;