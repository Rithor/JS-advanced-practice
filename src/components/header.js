import { Div } from '../common/div';
import './header.css';

export class Header extends Div {

  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.classList.add('header');
    this.el.innerHTML = `
        <div class="logo">
    <img src="./static/svg/main-logo.svg" alt="logo icon">
  </div>
  <div class="menu">
    <a class="menu__item" href="#">
      <img class="menu__searchIcon" src="./static/svg/search.svg" alt="search icon">
      <div class="menu__searchText">Book Search</div>
    </a>
    <a class="menu__item" href="#">
      <img class="menu__favoritesIcon" src="./static/svg/favorites.svg" alt="favorites icon">
      <div class="menu__favoritesText">Favorites</div>
      <div class="menu__favoritesCount">${this.appState.favorites.length}</div>
    </a>
  </div>
    `;

    return this.el;
  }

}