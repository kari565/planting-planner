import React from 'react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme';
import Content from '../components/Content';
import VegPatchContainer from '../components/VegPatchContainer';
import VegPatchDetails from '../components/VegPatchDetails';
import PlantListContainer from '../components/PlantListContainer';

const data = {
  vegPatches: [
    { name: "Grządka 1", width: "2", height: "1",
      vegetables: [
        { name: "Marchew", fulfillment: 5, plantingDate: "13.03.2020" },
        { name: "Kapusta", fulfillment: 5, plantingDate: "23.04.2020" },
        { name: "Rzodkiewka", fulfillment: 5, plantingDate: "04.03.2020" }
    ]}
  ],
  plantItems: [
    { key: 0, _id: 0, name: 'Fasola', sowingDate: 'Marzec', harvestSeason: [1, 2, 3], vegetationDuration: '3 miesiące', harvestDuration: '1 miesiąc' },
    { key: 1, _id: 1, name: 'Groch', sowingDate: 'Marzec', harvestSeason: [2, 3], vegetationDuration: '3 miesiące', harvestDuration: '1 miesiąc' },
    { key: 2, _id: 2, name: 'Marchew', sowingDate: 'Kwiecień', harvestSeason: [1, 2, 3, 4], vegetationDuration: '2 miesiące', harvestDuration: '1 miesiąc' },
    { key: 3, _id: 3, name: 'Bób', sowingDate: 'Maj', harvestSeason: [2, 3], vegetationDuration: '3 miesiące', harvestDuration: '1 miesiąc' },
    { key: 4, _id: 4, name: 'Pietruszka', sowingDate: 'Luty', harvestSeason: [1, 2, 3, 4], vegetationDuration: '4 miesiące', harvestDuration: '3 miesiące' },
  ]
}

const props = {
    data: data,
    sendDisplay: function(disp){},
    sendPatch: function(patch){}
}

describe('Content component', () => {
    it('getActivePatch works correctly', () => {
        const patch = data.vegPatches[0];
        const wrapper = shallow(<Content {...props} display="patches" />);
        wrapper.find('VegPatchContainer').props().sendActivePatch(patch);
        wrapper.setProps({ display: 'patch details' });
        expect(wrapper.find('VegPatchDetails').props().patch).toEqual(patch);
    });

    it('getDisplay works correctly', () => {
        const mockSendDisplay = jest.fn();
        const wrapper = shallow(<Content {...props} display="patches" sendDisplay={mockSendDisplay} />);
        wrapper.find('VegPatchContainer').props().sendDisplay('patch details');
        expect(mockSendDisplay).toHaveBeenCalledTimes(1);
        expect(mockSendDisplay).toHaveBeenCalledWith('patch details');
    });

    it('sendPatch works correctly', () => {
        const patch = data.vegPatches[0];
        const mockSendPatch = jest.fn();
        const wrapper = shallow(<Content {...props} display="patch details" sendPatch={mockSendPatch} />);
        wrapper.find('VegPatchDetails').props().sendPatch(patch);
        expect(mockSendPatch).toHaveBeenCalledTimes(1);
        expect(mockSendPatch).toHaveBeenCalledWith(patch);
    });

    it('renders proper components depending on "display" prop', () => {
        const wrapper = shallow(<Content {...props} display="plants" />);
        expect(wrapper.containsMatchingElement(<PlantListContainer />)).toEqual(true)
        wrapper.setProps({ display: 'patches' });
        expect(wrapper.containsMatchingElement(<VegPatchContainer />)).toEqual(true)
        wrapper.setProps({ display: 'patch details' });
        //expect(wrapper.containsMatchingElement(<VegPatchDetails />)).toEqual(false)
        setTimeout(() => expect(wrapper.containsMatchingElement(<VegPatchDetails />)).toEqual(true), 3000);
    });
});