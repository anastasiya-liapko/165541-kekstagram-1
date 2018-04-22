'use strict';

(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var recommended = filters.querySelector('#filter-recommend');
  var popular = filters.querySelector('#filter-popular');
  var discussed = filters.querySelector('#filter-discussed');
  var random = filters.querySelector('#filter-random');

  document.querySelector('.upload-overlay').classList.add('hidden');
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };
  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  picturesList.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });
  setupClose.addEventListener('click', function () {
    closePopup();
  });
  setupClose.onkeydown = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var pictures = [];

  var getUrl = function (evt) {
    evt.preventDefault();
    var elem = evt.target;
    if (elem.hasAttribute('src')) {
      var url = elem.getAttribute('src');
    } else {
      elem = elem.parentNode;
      if (elem.firstElementChild.hasAttribute('src')) {
        url = elem.firstElementChild.getAttribute('src');
      } else {
        elem = elem.parentNode;
        if (elem.firstElementChild.hasAttribute('src')) {
          url = elem.firstElementChild.getAttribute('src');
        }
      }
    }
    window.preview(pictures, url, galleryOverlay);
  };
  picturesList.addEventListener('click', getUrl);

  recommended.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      var firstArray;
      var firstNumber;
      var secondArray;
      var secondNumber;
      first = first.url;
      second = second.url;
      var slash = '/';
      var dot = '.';
      firstArray = first.split(slash);
      firstNumber = firstArray[1].split(dot);
      secondArray = second.split(slash);
      secondNumber = secondArray[1].split(dot);
      return firstNumber[0] - secondNumber[0];
    });
    window.util.debounce(renderPictures);
  });
  popular.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      var value = (first.likes >= second.likes) ? -1 : 1;
      return value;
    });
    window.util.debounce(renderPictures);
  });
  discussed.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      first = first.comments.length;
      second = second.comments.length;
      var value = (first >= second) ? -1 : 1;
      return value;
    });
    window.util.debounce(renderPictures);
  });
  random.addEventListener('click', function () {
    pictures.sort(function () {
      return Math.random() - 0.5;
    });
    window.util.debounce(renderPictures);
  });

  var renderPictures = function () {
    render(pictures);
  };
  var render = function (image) {
    picturesList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    image.forEach(function (item) {
      fragment.appendChild(window.picture(item));
    });
    picturesList.appendChild(fragment);
  };

  var onSuccess = function (image) {
    pictures = image;
    renderPictures();
    filters.classList.remove('filters-inactive');
  };
  var onError = function (errorMessage) {
    window.util.error(errorMessage);
  };

  pictures = window.data.pictures;
  onSuccess(pictures);
  // window.backend.load(onSuccess, onError);

})();
