import View from './View.js';
// import doo from '../img/icons.svg';parcel 1 syntax
//parcel 2 syntax
import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';
// exporting with commonjs and importing with es6 will not work, unless
// it is bundle up
// import { Fraction } from 'fractional';
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMsg = 'We could not find that recipe.';
  _msg = '';
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      //when the attribute of data contains a dash, besides the prefix 'data-',
      //as in 'data-update-to', update-to will be converted to updateTo
      // const updateTo = +btn.dataset.updateTo;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--boomark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
  <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${this._data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this._data.cookingTime
    }</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
  <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--update-servings" data-update-to="${
        this._data.servings - 1
      }">
      <svg>
          <use href="${icons}#icon-minus-circle"></use>
          </svg>
          </button>
      <button class="btn--tiny btn--update-servings" data-update-to="${
        this._data.servings + 1
      }">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}"><svg>
    <use href="${icons}#icon-user"></use>
  </svg>
  </div>
  <button class="btn--round btn--boomark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
  ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
  </ul>
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
  This recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      this._data.publisher
    }</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${this._data.sourceUrl}"
    target="_blank"
    >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </a>
</div>`;
  }
  _generateMarkupIngredient(ingredient) {
    return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ingredient.quantity ? fracty(ingredient.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.description}
  </div>
</li>`;
  }
}
export default new RecipeView();
