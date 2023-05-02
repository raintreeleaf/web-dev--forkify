import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _errorMsg = 'No recipes found!';
  _msg = '';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    // return this._data.map(this._generateMarkupPreview).join('');
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
