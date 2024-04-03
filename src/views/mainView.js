/* eslint-disable no-case-declarations */
import { AbstractView } from "../common/view.js";
import { Header } from "../components/header.js";
import { Search } from "../components/search.js";
import { CardsList } from "../components/cardsList.js";
import { Pagination } from "../components/pagination.js";
import onChange from 'on-change';

export class MainView extends AbstractView {

  state = {
    cardsList: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
    limit: 6,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(
      this.appState, this.#appStateHook.bind(this)
    );
    this.state = onChange(
      this.state, this.#stateHook.bind(this)
    );
    this.setTitle('Find Books');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  #appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async #stateHook(path) {
    console.log(`trigger stateHook with: ${path}`);

    switch (path) {

      case 'offset':
      case 'searchQuery':
        this.state.loading = true;

        console.log(this.state.offset)

        const data = await this.#loadCardsList(this.state.searchQuery, this.state.offset, this.state.limit);

        console.log(data)

        this.state.loading = false;
        this.state.numFound = data.numFound;
        this.state.cardsList = data.docs;
        break;

      case 'loading':
        this.render();
        break;

      case 'cardsList':
        this.render();
        break;

      default: console.log('stateHook function case default');
    }
  }

  async #loadCardsList(searchQuery, offset, limit) {
    const result = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery}&offset=${offset}&limit=${limit}`
    );
    return result.json();
  }

  render() {
    this.app.innerHTML = '';
    this.#renderHeader();

    const mainView = document.createElement('div');
    mainView.classList.add('mainView');

    mainView.append(
      new Search(this.state).render()
    );

    this.#renderBooksFound(mainView);

    mainView.append(
      new CardsList(this.appState, this.state).render()
    );

    this.#renderPagination(mainView);

    this.app.append(mainView);
  }

  #renderHeader() {
    this.app.prepend(
      new Header(this.appState).render()
    );
  }

  #renderBooksFound(mainView) {
    if (this.state.cardsList.length < 1) {
      return;
    }
    const booksFound = document.createElement('div');
    booksFound.classList.add('booksFound');
    booksFound.innerHTML = `<div class="booksFound">Books found – ${this.state.numFound}</div>`;
    mainView.append(booksFound);
  }

  #renderPagination(mainView) {
    if (this.state.cardsList.length < 1) {
      return;
    }
    mainView.append(
      new Pagination(this.state).render()
    );
  }

}