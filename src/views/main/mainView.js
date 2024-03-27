import { AbstractView } from "../../common/view.js";
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
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Find Books');
  }

  appStateHook(path, value) {
    console.log(path, value);
  }

  render() {
    const mainView = document.createElement('div');
    mainView.innerHTML = `number of books: ${this.appState.favorites.length}`;
    this.app.innerHTML = '';
    this.app.append(mainView);
  }

}