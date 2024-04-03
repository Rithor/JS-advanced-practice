/* eslint-disable no-case-declarations */
import { AbstractView } from "../common/view.js";
import { Header } from "../components/header.js";
import { CardsList } from "../components/cardsList.js";
import onChange from 'on-change';

export class FavoritesView extends AbstractView {

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(
      this.appState, this.#appStateHook.bind(this)
    );
    this.setTitle('Favorites Books');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  #appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    this.app.innerHTML = '';
    this.#renderHeader();
    const favoritesView = document.createElement('div');
    favoritesView.classList.add('favoritesView');
    favoritesView.innerHTML = `<div class="booksFound">Favorites Books</div>`;
    favoritesView.append(
      new CardsList(this.appState, { cardsList: this.appState.favorites }).render()
    );
    this.app.append(favoritesView);
  }

  #renderHeader() {
    this.app.prepend(
      new Header(this.appState).render()
    );
  }

}