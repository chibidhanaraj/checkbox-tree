import React from 'react';
import Checkbox from './Checkbox';
import Districts from './Districts';

class Zones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneCheckboxes: props.zones.reduce(
        (zones, zone) => ({
          ...zones,
          [zone.id]: false
        }),
        {}
      ),
    };
  }

  handleZoneCheckboxChange = (e) => {
    const { id } = e.target;

    this.setState(prevState => ({
      zoneCheckboxes: {
        ...prevState.zoneCheckboxes,
        [id]: !prevState.zoneCheckboxes[id]
      }
    }));
  };

  handleZoneCheckboxOnDistrictCheckboxChange = (isAtleastOneDistrictChecked = false, zoneId) => {
    this.setState(prevState => ({
      zoneCheckboxes: {
        ...prevState.zoneCheckboxes,
        [zoneId]: isAtleastOneDistrictChecked
      }
    }));
  }

  render() {
    const { zones } = this.props;

    let renderZones = (zones || []).map(zone => {
      return (
        <ul key={zone.id}>
          <Checkbox
            node={zone}
            checked={this.state.zoneCheckboxes[zone.id]}
            onCheckboxChange={this.handleZoneCheckboxChange}
          />
          {zone.districts && <Districts districts={zone.districts} 
                                        zoneId={zone.id} 
                                        isZoneChecked={this.state.zoneCheckboxes[zone.id]}
                                        isAtleastOneDistrictChecked={this.handleZoneCheckboxOnDistrictCheckboxChange} />}
        </ul>
      );
    });

    return <div>{renderZones}</div>;
  }
}

export default Zones
