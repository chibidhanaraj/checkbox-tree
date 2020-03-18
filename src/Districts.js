import React from 'react';
import Checkbox from './Checkbox';
import Divisions from './Divisions';
import _ from "lodash";

class Districts extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      districtCheckboxes: props.districts.reduce(
        (districts, district) => ({
          ...districts,
          [district.id]: false
        }),
        {}
      ),
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isZoneChecked && (this.props.isZoneChecked !== prevProps.isZoneChecked)) {
      this.unCheckDistrictOnZoneUncheck()
    }
  }

  unCheckDistrictOnZoneUncheck = () => {
    let districtCheckboxes = _.cloneDeep(this.state.districtCheckboxes);
    Object.keys(districtCheckboxes).forEach(key => {
      districtCheckboxes[key] = false;
    });

    this.setState({
      districtCheckboxes
    })
  }

  updateZoneCheckBoxOnAtleastOneSelection = () => {
    let districtCheckboxes = _.cloneDeep(this.state.districtCheckboxes);
    let isAtleastOneDistrictChecked = Object.values(districtCheckboxes).some(isAtleastOneDistrictChecked => isAtleastOneDistrictChecked === true)
    
    this.props.isAtleastOneDistrictChecked(isAtleastOneDistrictChecked, this.props.zoneId)
  }

  handleDistrictCheckboxOnDivisionCheckboxChange = (isAtleastOneDivisionChecked = false, districtId) => {
    this.setState(prevState => ({
      districtCheckboxes: {
        ...prevState.districtCheckboxes,
        [districtId]: isAtleastOneDivisionChecked
      }
    }),
      () => this.updateZoneCheckBoxOnAtleastOneSelection()
    );
  }

  handleDistrictCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      districtCheckboxes: {
        ...prevState.districtCheckboxes,
        [id]: !prevState.districtCheckboxes[id]
      }
    }),
    () => this.updateZoneCheckBoxOnAtleastOneSelection()
    );
  };

  render() {
    const { districts } = this.props;
    
    let renderDistricts = (districts || []).map((district) => {                   
      return (
        <ul key={district.id}>
          <Checkbox
            node={district}
            checked={this.state.districtCheckboxes[district.id]}
            onCheckboxChange={this.handleDistrictCheckboxChange}
          />
          {
          district.divisions && <Divisions divisions={district.divisions} 
                                           districtId={district.id} 
                                           isDistrictChecked={this.state.districtCheckboxes[district.id]}
                                           isAtleastOneDivisionChecked={this.handleDistrictCheckboxOnDivisionCheckboxChange} /> 
          }
        </ul>
      );
    });       

    return (
      <div>
         {renderDistricts}    
      </div>
    );
  }
}

export default Districts
