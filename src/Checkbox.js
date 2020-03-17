import React from 'react';

class Checkbox extends React.Component {
    
  handleCheckboxChange = (e) => {
    this.props.onCheckboxChange(e)
  }

  render() {      
    return (
      <li key={this.props.node.id}>
        <label>
          <input
            type="checkbox"
            checked={this.props.checked}
            id={this.props.node.id}
            onChange={this.handleCheckboxChange}
          />
          <span>{this.props.node.name}</span>
        </label>
      </li>
    );
  }
}

export default Checkbox