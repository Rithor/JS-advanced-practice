import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header.js";
import { Search } from "../../components/search.js";
import onChange from 'on-change';

export class MainView extends AbstractView {

  state = {
    list: [],
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

  appStateHook(path, value) {
    if (path === 'favorites') {
      console.log(path, value);
    }
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.list = data.docs;
      console.log(data.docs);
    }
  }

  async loadList(searchQuery, offset) {
    const result = await fetch(
      `https://openlibrary.org/search.json?q=${searchQuery}&offset=${offset}`
    );
    return result.json();
  }

  render() {
    this.app.innerHTML = '';
    const mainView = document.createElement('div');
    mainView.classList.add('mainView');
    mainView.append(
      new Search(this.state).render()
    )
    this.app.append(mainView);
    this.renderHeader();
  }

  renderHeader() {
    this.app.prepend(
      new Header(this.appState).render()
    );
  }

}