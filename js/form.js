'use strict';

(function (backend, initializeFilters, initializeScale) {
  var form = document.querySelector('.upload-form');
  var uploadFile = form.querySelector('#upload-file');
  var uploadImage = document.querySelector('.upload-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = form.querySelector('.upload-form-cancel');

  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var effectControls = document.querySelector('.upload-effect-level');
  var thumbElem = document.querySelector('.upload-effect-level-pin');
  var sliderLine = document.querySelector('.upload-effect-level-val');
  var sliderElem = document.querySelector('.upload-effect-level-line');

  var uploadResizeControlsValue = form.querySelector('.upload-resize-controls-value');
  var resizeControlDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');

  var clickHundler = function () {
    uploadOverlay.classList.add('hidden');
    uploadImage.classList.remove('hidden');
    document.removeEventListener('keydown', keydownHundler);
  };

  var keydownHundler = function (evt) {
    if (evt.keyCode === 27) {
      if (uploadFormDescription !== document.activeElement) {
        clickHundler();
      }
    }
  };

  uploadFile.addEventListener('change', function () {
    if (uploadFile.validity.valid === true) {
      uploadImage.classList.add('hidden');
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', keydownHundler);
    }
  });

  uploadFormCancel.addEventListener('click', function () {
    clickHundler();
  });

  effectControls.classList.add('hidden');
  var changeEffect = function (oldEffects, newEffect) {
    oldEffects.forEach(function (item, i) {
      effectImagePreview.classList.remove('effect-' + item);
    });
    effectImagePreview.style.filter = '';
    effectImagePreview.classList.add('effect-' + newEffect);
    effectControls.classList.remove('hidden');
  };
  var parameters = [uploadEffect, effectImagePreview, effectControls, thumbElem, sliderElem, sliderLine, changeEffect];
  initializeFilters.createEffect(parameters);

  var adjustScale = function (value) {
    effectImagePreview.style.transform = 'scale(' + value / 100 + ')';
  };

  initializeScale.setSize(uploadResizeControlsValue, adjustScale, resizeControlDec, resizeControlInc);

  uploadFormDescription.addEventListener('invalid', function (evt) {
    if (uploadFormDescription.validity.valueMissing) {
      uploadFormDescription.setCustomValidity('Обязательное поле');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else if (uploadFormDescription.validity.tooShort) {
      uploadFormDescription.setCustomValidity('Слишком короткое значение');
      uploadFormDescription.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    } else {
      uploadFormDescription.setCustomValidity('');
      uploadFormDescription.setAttribute('style', 'box-shadow: none');
    }
  });

  var setError = function (evt, value) {
    uploadFormHashtags.setCustomValidity(value);
    uploadFormHashtags.setAttribute('style', 'box-shadow: 0 0 0 3px rgb(255, 0, 0)');
    evt.preventDefault();
  };

  form.addEventListener('submit', function (evt) {
    var sharp = true;
    var space = true;
    var repeat = true;
    var maxFive = true;
    var maxTwenty = true;
    var hashtag = uploadFormHashtags.value;
    var hashtagArr = [];
    hashtagArr = hashtag.split(' ');
    for (var i = 0; i < hashtagArr.length; i++) {
      var pocket = hashtagArr[i].split('');
      if (pocket.length >= 1 && pocket[0] !== '#') {
        sharp = false;
      }
    }
    for (i = 0; i < hashtagArr.length; i++) {
      var bag = hashtagArr[i].split('');
      var number = 0;
      for (var j = 0; j < bag.length; j++) {
        if (bag[j] === '#') {
          number = number + 1;
          if (number > 1) {
            space = false;
          }
        }
      }
    }
    for (i = 0; i < hashtagArr.length - 1; i++) {
      for (j = i + 1; j < hashtagArr.length; j++) {
        if (hashtagArr[i] === hashtagArr[j]) {
          repeat = false;
        }
      }
    }
    if (hashtagArr.length > 5) {
      maxFive = false;
    }
    for (i = 0; i < hashtagArr.length; i++) {
      pocket = hashtagArr[i].split('');
      if (pocket.length > 20) {
        maxTwenty = false;
      }
    }
    if (sharp && space && repeat && maxFive && maxTwenty) {
      backend.save(new FormData(form), function (response) {
        uploadOverlay.classList.add('hidden');
        uploadImage.classList.remove('hidden');
        form.reset();
      });
      evt.preventDefault();
    } else if (!sharp) {
      setError(evt, 'Хэш-тег начинается с символа `#` (решётка)');
    } else if (!space) {
      setError(evt, 'хэш-теги разделяются пробелами');
    } else if (!repeat) {
      setError(evt, 'Один и тот же хэш-тег не может быть использован дважды');
    } else if (!maxFive) {
      setError(evt, 'Нельзя указать больше пяти хэш-тегов');
    } else if (!maxTwenty) {
      setError(evt, 'Максимальная длина одного хэш-тега 20 символов');
    }
  });
})(window.backend, window.initializeFilters, window.initializeScale);
