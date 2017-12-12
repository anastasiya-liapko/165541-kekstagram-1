'use strict';

(function () {
  window.picture = function (image) {
    var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('img').src = image.url;
    picturesElement.querySelector('.picture-likes').textContent = image.like;
    picturesElement.querySelector('.picture-comments').textContent = image.comment;
    return picturesElement;
  };
})();
