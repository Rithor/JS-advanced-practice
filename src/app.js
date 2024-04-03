'use strict'

import '../static/global.css';
import { MainView } from './views/mainView.js';
import { FavoritesView } from './views/favoritesView.js';

class App {

  routes = [
    { path: '', view: MainView },
    { path: '#favorites', view: FavoritesView }
  ];

  appState = {
    favorites: [],
  };

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const view = this.routes
      .find(route => route.path == location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }

}

new App();