import React from 'react';
import Checkbox from './Checkbox';

class BeatAreas extends React.Component {  
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      beatAreaCheckboxes: props.beatAreas.reduce(
        (beatAreas, beatArea) => ({
          ...beatAreas,
          [beatArea.id]: false
        }),
        {}
      ),
    };
  }  

  handleBeatAreaCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      beatAreaCheckboxes: {
        ...prevState.beatAreaCheckboxes,
        [id]: !prevState.beatAreaCheckboxes[id]
      }
    }));
  };

  render() {
    const { beatAreas } = this.props;
    
    let renderBeatAreas = (beatAreas || []).map((beatArea) => {                   
      return (
        <ul key={beatArea.id}>
          <Checkbox
            node={beatArea}
            checked={this.state.beatAreaCheckboxes[beatArea.id]}
            onCheckboxChange={this.handleBeatAreaCheckboxChange}
          />
        </ul>
      );
    });       

    return (
      <div>
         {renderBeatAreas}   
      </div>
    );
  }
}

export default BeatAreas
