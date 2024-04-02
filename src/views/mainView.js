/* eslint-disable no-case-declarations */
import { AbstractView } from "../common/view.js";
import { Header } from "../components/header.js";
import { CardsList } from "../components/cardsList.js";
import { Search } from "../components/search.js";
import onChange from 'on-change';

export class MainView extends AbstractView {

  state = {
    cardsList: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(
      this.appState, this.appStateHook.bind(this)
    );
    this.state = onChange(
      this.state, this.stateHook.bind(this)
    );
    this.setTitle('Find Books');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async stateHook(path) {
    console.log(`trigger stateHook with: ${path}`);

    switch (path) {

      case 'searchQuery':
        this.state.loading = true;
        const data = await this.loadCardsList(this.state.searchQuery, this.state.offset);
        this.state.loading = false;
        this.state.numFound = data.numFound;
        this.state.cardsList = data.docs;
        console.log(data);
        break;

      case 'loading':
        this.render();
        break;

      case 'cardsList':
        this.render();
        console.log('case cardsList');
        break;

      default: console.log('stateHook function didn\'t work properly');
    }
  }

  async loadCardsList(searchQuery, offset) {
    const result = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery}&offset=${offset}`
    );
    return result.json();
  }

  render() {
    this.app.innerHTML = '';
    this.renderHeader();
    const mainView = document.createElement('div');
    mainView.classList.add('mainView');
    mainView.append(
      new Search(this.state).render()
    )
    mainView.append(
      new CardsList(this.appState, this.state).render()
    );
    this.app.append(mainView);
  }

  renderHeader() {
    this.app.prepend(
      new Header(this.appState).render()
    );
  }

}