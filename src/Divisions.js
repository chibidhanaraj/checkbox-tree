import React from 'react';
import Checkbox from './Checkbox';
import BeatAreas from './BeatAreas';
import _ from "lodash";

class Divisions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisionCheckboxes: props.divisions.reduce(
        (divisions, division) => ({
          ...divisions,
          [division.id]: false
        }),
        {}
      ),
    };
  }  

  componentDidUpdate(prevProps) {
    if (!this.props.isDistrictChecked && (this.props.isDistrictChecked !== prevProps.isDistrictChecked)) {
      this.unCheckDivisionOnDistrictUncheck()
    }
  }

  unCheckDivisionOnDistrictUncheck = () => {
    let divisionCheckboxes = _.cloneDeep(this.state.divisionCheckboxes);
    Object.keys(divisionCheckboxes).forEach(key => {
      divisionCheckboxes[key] = false;
    });

    this.setState({
      divisionCheckboxes
    })
  }

  updateDistrictCheckBoxOnAtleastOneSelection = () => {
    let divisionCheckboxes = _.cloneDeep(this.state.divisionCheckboxes);
    let isAtleastOneDivisionChecked = Object.values(divisionCheckboxes).some(isAtleastOneDivisionChecked => isAtleastOneDivisionChecked === true)
    
    this.props.isAtleastOneDivisionChecked(isAtleastOneDivisionChecked, this.props.districtId)
  }

  handleDivisionCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      divisionCheckboxes: {
        ...prevState.divisionCheckboxes,
        [id]: !prevState.divisionCheckboxes[id]
      }
    }),
      //Callback
      () => this.updateDistrictCheckBoxOnAtleastOneSelection()
    );
  };

  handleDivisionCheckboxOnBeatAreaCheckboxChange = (isAtleastOneBeatAreaChecked = false, divisionId) => {
    this.setState(prevState => ({
      divisionCheckboxes: {
        ...prevState.divisionCheckboxes,
        [divisionId]: isAtleastOneBeatAreaChecked
      }
    }),
    () => {
      this.updateDistrictCheckBoxOnAtleastOneSelection()
    });
  }
  
  render() {
    const { divisions } = this.props;
    
    let renderDivisions = (divisions || []).map((division) => {                   
      return (
        <ul key={division.id}>
          <Checkbox
            node={division}
            checked={this.state.divisionCheckboxes[division.id]}
            onCheckboxChange={this.handleDivisionCheckboxChange}
          />
          {
            division.beatAreas && <BeatAreas beatAreas={division.beatAreas} 
                                    divisionId={division.id}
                                    isDivisionChecked={this.state.divisionCheckboxes[division.id]}
                                    isAtleastOneBeatAreaChecked={this.handleDivisionCheckboxOnBeatAreaCheckboxChange}
                                    />
          }
        </ul>
      );
    });       

    return (
      <div>    
         {renderDivisions}       
      </div>
    );
  }
}

export default Divisions
