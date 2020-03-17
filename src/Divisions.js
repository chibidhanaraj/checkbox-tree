import React from 'react';
import Checkbox from './Checkbox';
import BeatAreas from './BeatAreas';

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

  handleDivisionCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      divisionCheckboxes: {
        ...prevState.divisionCheckboxes,
        [id]: !prevState.divisionCheckboxes[id]
      }
    }));
  };
  
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
          {division.beatAreas && <BeatAreas beatAreas={division.beatAreas} />}
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
