import React from 'react';
import Checkbox from './Checkbox';
import _ from "lodash";

class BeatAreas extends React.Component {  
  constructor(props) {
    super(props);
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
  
  componentDidUpdate(prevProps) {
    if (!this.props.isDivisionChecked && (this.props.isDivisionChecked !== prevProps.isDivisionChecked)) {
      this.unCheckBeatAreaOnDivisionUncheck()
    }
  }

  unCheckBeatAreaOnDivisionUncheck = () => {
    let beatAreaCheckboxes = _.cloneDeep(this.state.beatAreaCheckboxes);
    Object.keys(beatAreaCheckboxes).forEach(key => {
      beatAreaCheckboxes[key] = false;
    });

    this.setState({
      beatAreaCheckboxes
    })
  }

  updateDivisionCheckBoxOnAtleastOneSelection = () => {
    let beatAreaCheckboxes = _.cloneDeep(this.state.beatAreaCheckboxes);
    let isAtleastOneBeatAreaChecked = Object.values(beatAreaCheckboxes).some(isBeatAreaChecked => isBeatAreaChecked === true)
    
    this.props.isAtleastOneBeatAreaChecked(isAtleastOneBeatAreaChecked, this.props.divisionId)
  }

  handleBeatAreaCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      beatAreaCheckboxes: {
        ...prevState.beatAreaCheckboxes,
        [id]: !prevState.beatAreaCheckboxes[id]
      }
    }),
        //Callback
    () => this.updateDivisionCheckBoxOnAtleastOneSelection()
  );

    
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
