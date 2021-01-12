import React from 'react';
import '@testing-library/jest-dom'
import { shallow, mount } from 'enzyme';
import MenuContainer from '../components/MenuContainer';
import MenuItem from '../components/MenuItem';
import MenuItemPointer from '../components/MenuItemPointer';

jest.mock('../components/MenuItemPointer', () => {
  const MenuItemPointer = () => <div />;
  return MenuItemPointer;
});

const props = {
    sendDisplay: function(disp){}
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MenuContainer component', () => {
    it('handleClick works correctly', () => {
      const mockSendDisplay = jest.fn();
      const wrapper = shallow(<MenuContainer sendDisplay={mockSendDisplay} />);
      const secondMenuItem = wrapper.find('.menu-item').at(1)
      secondMenuItem.simulate('click');
      const clickedItem = secondMenuItem.getDOMNode();
      expect(wrapper.find('MenuItemPointer').props().activeItemRef).toEqual(clickedItem);
      expect(mockSendDisplay).toHaveBeenCalledTimes(1);
      expect(mockSendDisplay).toHaveBeenCalledWith("plants");
    });

    it('renders proper components', () => {
        const wrapper = shallow(<MenuContainer {...props} />);
        expect(wrapper.containsMatchingElement(<MenuItem />)).toEqual(true)
        expect(wrapper.find('MenuItem').length).toBe(2);
        expect(wrapper.containsMatchingElement(<MenuItemPointer />)).toEqual(true)
    });
});