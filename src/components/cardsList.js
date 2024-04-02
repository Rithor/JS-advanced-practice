import { Div } from '../common/div';
import { Card } from "../components/card.js";
import "./cardsList.css";

export class CardsList extends Div {

  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
    console.log(state)

  }

  render() {
    if (this.state.loading) {
      return this.renderWaitingView();
    }

    this.el.classList.add('cardsList');

    const cardsGrid = document.createElement('div');
    cardsGrid.classList.add('cards__grid');
    this.el.append(cardsGrid);

    this.state.cardsList.forEach(element => {
      cardsGrid.append(
        new Card(this.appState, element).render()
      )
    });

    return this.el;
  }

  renderWaitingView() {
    const loadAnimation = document.createElement('div');
    loadAnimation.classList.add('loader');
    return loadAnimation;
  }
}