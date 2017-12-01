'use strict';

(function (preview, picture, util, backend) {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var setupClose = document.querySelector('.gallery-overlay-close');
  var openPicture = document.querySelector('.pictures');
  var picturesList = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var recommended = document.querySelector('#filter-recommend');
  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');

  document.querySelector('.upload-overlay').classList.add('hidden');

  var onPopupEscPress = function (evt) {
    util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  openPicture.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.onkeydown = function (evt) {
    util.isEnterEvent(evt, closePopup);
  };

  var renderGallery = function (image) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = image.url;
    galleryOverlay.querySelector('.likes-count').textContent = image.likes;
    galleryOverlay.querySelector('.comments-count').textContent = image.comments.length;
    return galleryOverlay;
  };
  preview.bigImage(openPicture, renderGallery);

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
    util.debounce(renderPictures);
  });
  popular.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      if (first.likes > second.likes) {
        return -1;
      } else if (first.likes < second.likes) {
        return 1;
      } else {
        return 0;
      }
    });
    util.debounce(renderPictures);
  });
  discussed.addEventListener('click', function () {
    pictures.sort(function (first, second) {
      first = first.comments.length;
      second = second.comments.length;
      if (first > second) {
        return -1;
      } else if (first < second) {
        return 1;
      } else {
        return 0;
      }
    });
    util.debounce(renderPictures);
  });
  random.addEventListener('click', function () {
    pictures.sort(function () {
      return Math.random() - 0.5;
    });
    util.debounce(renderPictures);
  });

  var pictures = [];
  var renderPictures = function () {
    render(pictures);
  };
  var render = function (image) {
    picturesList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < image.length; i++) {
      fragment.appendChild(picture.renderPicture(image[i]));
    }
    picturesList.appendChild(fragment);
  };

  var successHandler = function (image) {
    pictures = image;
    renderPictures();
    filters.classList.remove('filters-inactive');
  };
  var errorHandler = function (errorMessage) {
    util.error(errorMessage);
  };

  backend.load(successHandler, errorHandler);
})(window.preview, window.picture, window.util, window.backend);
