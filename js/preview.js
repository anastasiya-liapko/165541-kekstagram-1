'use strict';

(function () {
  var renderGallery = function (image, element) {
    element.querySelector('.gallery-overlay-image').src = image.url;
    element.querySelector('.likes-count').textContent = image.likes;
    element.querySelector('.comments-count').textContent = image.comments.length;
    return element;
  };
  window.preview = function (pictures, url, element) {
    for (var i = 0; i < pictures.length; i++) {
      var pictureUrl = pictures[i].url;
      if (pictureUrl === url) {
        var index = i;
      }
    }
    renderGallery(pictures[index], element);
  };
})();
