'use strict'

import '../static/global.css';
import { MainView } from './views/mainView.js';

class App {

  routes = [
    { path: '', view: MainView }
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
      .find(route => route.path === location.hash).view;

    this.currentView = new view(this.appState);
    this.currentView.render();
  }

}

new App();


// const testapp = new App();
// console.log(testapp.routes[0])