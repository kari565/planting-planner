import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom'
import { fetchData, sendUpdatedData } from "../api/data";
import MenuContainer from '../components/MenuContainer';
import { shallow } from 'enzyme';
import Content from '../components/Content';

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

jest.mock("../api/data");

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('App component', () => {
  it('ComponentDidMount works correctly', async () => {
    fetchData.mockResolvedValueOnce(data);
    const wrapper = shallow(<App />);
    expect(wrapper.state('isLoading')).toBe(true);
    await wait(() => expect(fetchData).toHaveBeenCalledTimes(1));
    expect(wrapper.state('isLoading')).toBe(false);
    expect(wrapper.state('data')).toBe(data);
    fetchData.mockRestore();
  });

  it('getDisplay works correctly', async () => {
    fetchData.mockResolvedValueOnce(data);
    const wrapper = shallow(<App />);
    const componentInstance = wrapper.instance();
    componentInstance.getDisplay('patches');
    expect(wrapper.state('display')).toBe('patches');
    fetchData.mockRestore();
  });

  it('updatePatch works correctly', async () => {
    const patch = { name: "Grządka 1", width: "2", height: "1",
      vegetables: [
        { name: "Marchew", fulfillment: 5, plantingDate: "13.03.2020" },
        { name: "Kapusta", fulfillment: 5, plantingDate: "23.04.2020" },
        { name: "Szczypior", fulfillment: 25, plantingDate: "24.03.2020" }
    ]}
    const newData = {   
      plantItems: [ ...data.plantItems ],
      vegPatches: [{ ...patch }]
    }
    fetchData.mockResolvedValueOnce(data);
    sendUpdatedData.mockResolvedValueOnce(newData);
    const wrapper = shallow(<App />);
    const componentInstance = wrapper.instance();
    await wait(() => expect(fetchData).toHaveBeenCalledTimes(1));
    expect(wrapper.state('data')).toBe(data);
    await wait(() => componentInstance.updatePatch(patch));
    expect(wrapper.state('data')).toEqual(newData);
    expect(wrapper.state('isLoading')).toBe(false);
    fetchData.mockRestore();
    sendUpdatedData.mockRestore();
  });


  it('renders children components after data was fetched', async () => {
    fetchData.mockResolvedValueOnce(data);
    const wrapper = shallow(<App />);
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith();
    await wait(() => expect(wrapper.containsMatchingElement(<MenuContainer />)).toEqual(true));
    expect(wrapper.containsMatchingElement(<Content />)).toEqual(true)
    fetchData.mockRestore();
  });

  it('renders data depending on data fetching state', async () => {
    fetchData.mockResolvedValueOnce(data);
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith();
    await wait(() => expect(screen.getByText("ROŚLINY")).toBeInTheDocument());
    data.plantItems.forEach((item) =>
      expect(screen.getByText(item.name.toUpperCase())).toBeInTheDocument()
    );
    fetchData.mockRestore();
  });
});
