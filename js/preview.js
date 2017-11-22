'use strict';

window.preview = (function (backend, util) {
  var openImage = function (image, action) {
    image.addEventListener('click', function (evt) {
      evt.preventDefault();
      var elem = evt.target;
      var url;
      if (elem.hasAttribute('src')) {
        url = elem.getAttribute('src');
      }

      var successHandler = function (pictures) {
        for (var i = 0; i < pictures.length; i++) {
          var pictureUrl = pictures[i].url;
          if (pictureUrl === url) {
            var index = i;
          }
        }
        action(pictures[index]);
      };

      var errorHandler = function (errorMessage) {
        util.error(errorMessage);
      };

      backend.load(successHandler, errorHandler);
    });
  };

  return {
    bigImage: openImage
  };
})(window.backend, window.util);
