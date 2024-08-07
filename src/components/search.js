import { Div } from "../common/div";
import "./search.css";

export class Search extends Div {
  constructor(state) {
    super();
    this.state = state;
  }

  #search() {
    const value = this.el.querySelector(".search__input").value;
    if (value) {
      this.state.searchQuery = value;
    }
  }

  #addListeners() {
    this.el.querySelector(".search__btn").addEventListener("click", () => {
      this.#search();
    });
    this.el
      .querySelector(".search__input")
      .addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
          this.#search();
        }
      });
  }

  render() {
    this.el.classList.add("search");

    this.el.innerHTML = `
<div class="search__wrapper">
    <input class="search__input" type="text" placeholder="Find a book or an author...." value="${
      this.state.searchQuery ? this.state.searchQuery : ""
    }">
    <img src="./static/svg/search.svg" alt="Search icon">
</div>
<button class="search__btn"><img src="./static/svg/search-white.svg" alt="Search icon"></button>
    `;

    this.#addListeners();
    return this.el;
  }
}
