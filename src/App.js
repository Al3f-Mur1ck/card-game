import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import SavedCards from './components/SavedCards';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardPack: [],
    nameFilter: '',
    rareFilter: 'todas',
    trunfoFilter: false,
  };

  superTrunfoValidation = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  saveBtnValidation = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
    const maxAttr = 90;
    const maxSumAtrr = 210;
    const sumAtrr = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    if (cardName === ''
    || cardDescription === ''
    || cardImage === ''
    || cardRare === ''
    || cardAttr1 > maxAttr
    || cardAttr1 < 0
    || cardAttr2 > maxAttr
    || cardAttr2 < 0
    || cardAttr3 > maxAttr
    || cardAttr3 < 0
    || sumAtrr > maxSumAtrr) {
      return this.setState({
        isSaveButtonDisabled: true,
      });
    }
    return this.setState({
      isSaveButtonDisabled: false,
    });
  }

  resetForm = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: 'normal',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
    });
  }

  onSaveButtonClick = () => {
    const { cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardTrunfo, cardImage, cardRare, hasTrunfo, cardPack } = this.state;
    this.setState(() => {
      const response = {
        cardPack: [...cardPack, { cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          hasTrunfo,
          cardTrunfo }],
      };
      this.superTrunfoValidation();
      this.resetForm();
      return response;
    });
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({ [name]: value }),
      this.saveBtnValidation);
  }

  handleFilter = (item) => {
    // startsWith não passa no teste mesmo funcionando na pagina
    const { nameFilter, rareFilter } = this.state;
    // if (trunfoFilter) {
    // }
    if (rareFilter === 'todas') {
      return item.cardName.toLowerCase().includes(nameFilter.toLowerCase());
    }
    return item.cardName.toLowerCase()
      .includes(nameFilter.toLowerCase()) && item.cardRare === rareFilter;
  }

  onRemoveButtonClick = (event) => {
    const { cardTrunfo } = this.state;
    const item = event.target.parentElement;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: false });
    } else {
      this.setState({ hasTrunfo: true });
    }
    item.remove();
  }

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
      isSaveButtonDisabled,
      hasTrunfo,
      cardPack,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;
    const {
      handleFilter,
      onInputChange,
      onSaveButtonClick,
      onRemoveButtonClick } = this;

    return (
      <div>
        <h1>THE ELDER SCROLLS: SKYRIM - TRYUNFE EDITION</h1>
        <div className="divPai">
          <div className="info">
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ onInputChange }
              onSaveButtonClick={ onSaveButtonClick }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <section className="preview">
            <h1>Preview das cartas</h1>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </section>
        </div>
        <div className="divFilters">
          <Filters
            nameFilter={ nameFilter }
            onInputChange={ onInputChange }
            rareFilter={ rareFilter }
            trunfoFilter={ trunfoFilter }
          />
        </div>
        <div className="savedCards">
          {cardPack.filter((item) => (handleFilter(item))).map((card, count) => (
            <section className="cards" key={ count.cardName }>
              <SavedCards
                key={ card.cardName }
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
                onRemoveButtonClick={ onRemoveButtonClick }
              />
            </section>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
