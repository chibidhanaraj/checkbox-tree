import React from 'react';
import Checkbox from './Checkbox';
import Divisions from './Divisions';

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


  handleDistrictCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      districtCheckboxes: {
        ...prevState.districtCheckboxes,
        [id]: !prevState.districtCheckboxes[id]
      }
    }));
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
          {district.divisions && <Divisions divisions={district.divisions} />}
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
