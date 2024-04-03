import { Div } from '../common/div';
import './pagination.css';

export class Pagination extends Div {

  constructor(state) {
    super();
    this.state = state;
  }

  #runNextPage() {
    if (this.state.offset + this.state.limit < this.state.numFound) {
      this.state.offset += 6;
    }
  }

  #runPreviousPage() {
    if (this.state.offset - this.state.limit >= 0) {
      this.state.offset -= 6;
    }
  }

  render() {
    this.el.classList.add('pagination');
    this.el.innerHTML = `
          <div class="pagination__item previousPage">Previous page</div>
          <div class="pagination__item nextPage">Next page</div>
    `;

    this.el.querySelector('.previousPage').addEventListener('click', this.#runPreviousPage.bind(this));
    this.el.querySelector('.nextPage').addEventListener('click', this.#runNextPage.bind(this));

    return this.el;
  }

}