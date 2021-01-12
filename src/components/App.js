import React from 'react';   
import { fetchData, sendUpdatedData } from '../api/data';
import MenuContainer from './MenuContainer';
import Content from './Content';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'plants',
      isLoading: true,
      data: null
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await fetchData();
    this.setState({ data, isLoading: false });
  }

  getDisplay = display => this.setState({ display })

  updatePatch = async(newPatch) => {
    var patchIndex = this.state.data.vegPatches.findIndex(item => 
      item.name === newPatch.name);

    this.setState(prevState => ({
      data: {   
          plantItems: [ ...prevState.data.plantItems ],
          vegPatches: prevState.data.vegPatches.map((item, index) => 
            index === patchIndex ? newPatch : item
        )
      }
    }))
    
    const data = await sendUpdatedData(newPatch);
    this.setState({ data, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
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
