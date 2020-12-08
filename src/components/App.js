import React from 'react';
import ReactDOM from 'react-dom';    
import axios from 'axios'; 
import MenuContainer from './MenuContainer';
import Content from './Content';

const API = 'https://plant-data-provider.herokuapp.com/';
const DEFAULT_QUERY = 'data';
const UPDATE_QUERY = 'update-data'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: 'plants',
      isLoading: true,
      data: null
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchData();
  }

  fetchData = () =>  {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => {
        this.setState({ data, isLoading: false });
    }); 
  }

  sendUpdatedData = newPatch => {
    const headers = { 
      'Content-Type': 'application/json', 
      'Authorization': 'jwt-token'
    };

    axios.post(API + UPDATE_QUERY, { patch: newPatch }, { headers })
      .then(res => {
        this.fetchData();
    })
  }

  getDisplay = display => this.setState({ display })

  updatePatch = newPatch => {
    var patchIndex = this.state.data.vegPatches.findIndex(item => 
      item.name === newPatch.name);

    this.sendUpdatedData(newPatch);

    this.setState(prevState => ({
      data: {   
          plantItems: [ ...prevState.data.plantItems ],
          vegPatches: prevState.data.vegPatches.map((item, index) => 
            index === patchIndex ? newPatch : item
        )
      }
    }))
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div>
        <MenuContainer sendDisplay={this.getDisplay}/>      
        <Content display={this.state.display} data={this.state.data} 
        sendDisplay={this.getDisplay} sendPatch={this.updatePatch}/>
      </div>                            
    )
  }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('root'))
