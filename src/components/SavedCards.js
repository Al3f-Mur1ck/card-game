import React from 'react';
import PropTypes from 'prop-types';

class SavedCards extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      onRemoveButtonClick,
    } = this.props;
    return (
      <div>
        <h3 data-testid="name-card">{ cardName }</h3>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">{cardDescription}</p>
        <h5 data-testid="attr1-card">
          HEALTH.....................
          { cardAttr1 }
        </h5>
        <h5 data-testid="attr2-card">
          MAGICKA....................
          { cardAttr2 }
        </h5>
        <h5 data-testid="attr3-card">
          STAMINA....................
          { cardAttr3 }
        </h5>
        <h3 data-testid="rare-card">
          Raridade:
          {' '}
          { cardRare }
        </h3>
        {
          cardTrunfo && <section id="sup" data-testid="trunfo-card">Super Trunfo</section>
        }
        <button
          data-testid="delete-button"
          type="button"
          name="removeButton"
          onClick={ onRemoveButtonClick }
        >
          Excluir
        </button>
      </div>
    );
  }
}

SavedCards.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
};

export default SavedCards;
