import View from './View.js';
import previewView from './previewView.js';
// If you include ./ or ../, the import system will treat it as relative path
// and import accordingly.
// Otherwise, it will look for npm packages
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _errorMsg = 'No bookmarks yet!';
  _msg = '';
  _parentElement = document.querySelector('.bookmarks__list');
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // return this._data.map(this._generateMarkupPreview).join('');
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
