import React, { Component} from 'react';
import PropTypes from 'prop-types'

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, object_id } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(object_id);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="form-check">
        <input
            className="form-check-input"
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
        <label className="form-check-label">
          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  object_id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;