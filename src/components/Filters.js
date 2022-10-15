import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  render() {
    const { nameFilter, onInputChange, rareFilter, trunfoFilter } = this.props;
    return (
      <div className="filters">
        <input
          placeholder="Buscar carta"
          name="nameFilter"
          type="text"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ onInputChange }
          disabled={ trunfoFilter }
        />
        <label htmlFor="rareFilter">
          Raridade:
          <select
            data-testid="rare-filter"
            name="rareFilter"
            value={ rareFilter }
            onChange={ onInputChange }
            disabled={ trunfoFilter }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfoFilter">
          Super Trunfo
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            name="trunfoFilter"
            value={ trunfoFilter }
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

Filters.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  rareFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
};

export default Filters;
