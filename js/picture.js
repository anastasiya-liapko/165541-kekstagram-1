'use strict';

window.picture = (function () {
  return {
    renderPicture: function (image) {
      var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
      var picturesElement = pictureTemplate.cloneNode(true);
      picturesElement.querySelector('img').src = image.url;
      picturesElement.querySelector('.picture-likes').textContent = image.like;
      picturesElement.querySelector('.picture-comments').textContent = image.comment;
      return picturesElement;
    }
  };
})();


  // var urls = window.image.getUrls(1, 25);
  // var likes = window.image.getLikes(15, 200);
  // var comments = window.image.getComments();
  // var pictures = window.image.createPictures(urls, likes, comments);
