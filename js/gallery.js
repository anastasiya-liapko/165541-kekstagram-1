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
      return pictures.indexOf(first) - pictures.indexOf(second);
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
    pictures.sort(function (first, second) {
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
    filters.classList.remove('hidden');
  };
  var errorHandler = function (errorMessage) {
    util.error(errorMessage);
  };

  backend.load(successHandler, errorHandler);
})(window.preview, window.picture, window.util, window.backend);


// window.picture = (function (backend) {
//   var getImages = function (list) {
//     var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
//     var recommended = document.querySelector('#filter-recommend');
//     var popular = document.querySelector('#filter-popular');
//     var discussed = document.querySelector('#filter-discussed');
//     var random = document.querySelector('#filter-random');

//     var pictures = [];

//     var comparator = function (first, second) {
//       if (first > second) {
//         return -1;
//       } else if (first < second) {
//         return 1;
//       } else {
//         return 0;
//       }
//     };
//     var compareNumbers = function (first, second) {
//       return first - second;
//     };
//     var compareRandom = function (first, second) {
//       return Math.random() - 0.5;
//     };
//     var updatePictures = function (param) {
//       load(pictures.slice().sort(param));
//     };
//     var successHandler = function (image) {
//       pictures = image;
//       // updatePictures();
//     };

//     recommended.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         return pictures.indexOf(first) - pictures.indexOf(second);
//       }));
//     });
//     popular.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         if (first.likes > second.likes) {
//           return -1;
//         } else if (first.likes < second.likes) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }));
//     });
//     discussed.addEventListener('click', function () {
//       load(pictures.slice().sort(function (first, second) {
//         first = first.comments.length;
//         second = second.comments.length;
//         if (first > second) {
//           return -1;
//         } else if (first < second) {
//           return 1;
//         } else {
//           return 0;
//         }
//       }));
//     });
//     random.addEventListener('click', function () {
//       updatePictures(compareRandom);
//       // load(pictures.slice().sort(function (first, second) {
//       //   return Math.random() - 0.5;
//       // }));
//     });
//     random.removeEventListener('click', updatePictures);


//     var renderPicture = function (image) {
//       var picturesElement = pictureTemplate.cloneNode(true);
//       picturesElement.querySelector('img').src = image.url;
//       picturesElement.querySelector('.picture-likes').textContent = image.like;
//       picturesElement.querySelector('.picture-comments').textContent = image.comment;
//       return picturesElement;
//     };

//     var load = function (image) {
//       var fragment = document.createDocumentFragment();
//       for (var i = 0; i < image.length; i++) {
//         fragment.appendChild(renderPicture(image[i]));
//       }
//       list.appendChild(fragment);
//     };

//     var errorHandler = function (errorMessage) {
//       var node = document.createElement('div');
//       node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//       node.style.position = 'absolute';
//       node.style.left = 0;
//       node.style.right = 0;
//       node.style.fontSize = '30px';

//       node.textContent = errorMessage;
//       document.body.insertAdjacentElement('afterbegin', node);
//     };

//     backend.load(successHandler, errorHandler);
//   };
//   return {
//     image: getImages
//   };
// })(window.backend);





  // drugPopup.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     drugPopup.style.top = (drugPopup.offsetTop - shift.y) + 'px';
  //     drugPopup.style.left = (drugPopup.offsetLeft - shift.x) + 'px';
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseUp', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

  // uploadControl.addEventListener('dragover', function (evt) {
  //   evt.preventDefault();
  //   return false;
  // });

  // uploadControl.addEventListener('drop', function (evt) {
  //   evt.target.style.backgroundColor = '';
  //   // uploadFormPreview.replaceChild(draggedItem, drugPopup);
  //   uploadOverlay.classList.remove('hidden');
  //   evt.preventDefault();
  // });

  // uploadControl.addEventListener('dragenter', function (evt) {
  //   evt.target.style.backgroundColor = 'white';
  //   evt.preventDefault();
  // });

  // uploadControl.addEventListener('dragleave', function (evt) {
  //   evt.target.style.backgroundColor = '';
  //   evt.preventDefault();
  // });
