import { Div } from '../common/div';
import './card.css';

export class Card extends Div {

  constructor(appState, cardState) {
    super();
    this.cardState = cardState;
    this.appState = appState;
  }

  #removeFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      b => b.key !== this.cardState.key
    );
  }

  #addToFavorites() {
    this.appState.favorites.push(this.cardState);
  }

  render() {
    this.el.classList.add('card');
    const existInFavorites = this.appState.favorites.some(
      b => b.key == this.cardState.key
    );

    this.el.innerHTML = `
  <div class="card__image">
    <img src="https://covers.openlibrary.org/b/OLID/${this.cardState.cover_edition_key}-M.jpg" alt="book's image">
  </div>
  <div class="card__body">
    <div class="card__text">
        <div class="card__genre">
          ${this.cardState.subject_facet ? this.cardState.subject_facet[0] : 'not specified'}
        </div>
      <div class="card__title">${this.cardState.title}</div>
      <div class="card__author">${this.cardState.author_name}</div>
    </div>
    <button class="card__favoritesBtn ${existInFavorites ? 'card__favoritesBtn_active' : ''}">
      <img src="./static/svg/favorite-white.svg" alt="favorites icon">
    </button>
  </div>
    `;

    const favoritesBtn = this.el.querySelector('button');

    if (existInFavorites) {
      favoritesBtn.addEventListener('click', this.#removeFromFavorites.bind(this));
    } else {
      favoritesBtn.addEventListener('click', this.#addToFavorites.bind(this));
    }

    return this.el;
  }

}
