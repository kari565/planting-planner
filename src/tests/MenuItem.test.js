import React from 'react';
import '@testing-library/jest-dom'
import { shallow, mount } from 'enzyme';
import MenuItem from '../components/MenuItem';

const props = {
    item: { key: 'patches', text: 'Grządki' }
}

describe('MenuItem component', () => {
    it('renders properly', () => {
        const mockHandleClick = jest.fn();
        const wrapper = shallow(<MenuItem {...props} handleClick={mockHandleClick} />);
        expect(wrapper.find(".menu-item").length).toBe(1);
        wrapper.find(".menu-item").simulate('click');
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });
});