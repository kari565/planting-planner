import axios from 'axios'; 

const API = 'https://plant-data-provider.herokuapp.com/';
const DEFAULT_QUERY = 'data';
const UPDATE_QUERY = 'update-data'

export async function fetchData() {
    const response = await fetch(API + DEFAULT_QUERY);
    const data = await response.json();
    //this.setState({ data, isLoading: false });
    return data;
}

export async function sendUpdatedData(newPatch) {
    const headers = { 
    'Content-Type': 'application/json', 
    'Authorization': 'jwt-token'
    };

    await axios.post(API + UPDATE_QUERY, { patch: newPatch }, { headers })
    return fetchData();
}