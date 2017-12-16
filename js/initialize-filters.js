'use strict';

(function () {
  var pickEffect = function (controls, controlsContainer, pin, val, action) {
    controls.addEventListener('click', function (evt) {
      var elem = evt.target;
      var oldEffects = [
        'none',
        'chrome',
        'sepia',
        'marvin',
        'phobos',
        'heat',
      ];
      for (var i = 0; i < Math.min(oldEffects.length, 6); i++) {
        if (elem === document.querySelector('#upload-effect-' + oldEffects[i])) {
          var newEffect = oldEffects[i];
          action(oldEffects, newEffect);
          pin.style.left = '';
          val.style.width = '';
        }
      }
      if (elem === document.querySelector('#upload-effect-' + oldEffects[0])) {
        controlsContainer.classList.add('hidden');
      }
    });
  };

  var setEffect = function (image, pin, line, val) {
    pin.addEventListener('mousedown', function () {
      var sliderCoords = getCoords(line);

      var onMouseMove = function (moveEvt) {
        var newLeft = moveEvt.pageX - sliderCoords.left;
        newLeft = (newLeft < 0) ? 0 : newLeft;
        var rightEdge = line.offsetWidth;
        newLeft = (newLeft > rightEdge) ? rightEdge : newLeft;
        pin.style.left = newLeft + 'px';
        val.style.width = newLeft + 'px';
        var effectValue = (newLeft) / rightEdge;
        var oldEffect = [
          {name: 'chrome',
            value: 'grayscale(' + effectValue * 1},
          {name: 'sepia',
            value: 'sepia(' + effectValue * 1},
          {name: 'marvin',
            value: 'invert(' + effectValue * 100 + '%'},
          {name: 'phobos',
            value: 'blur(' + effectValue * 3 + 'px'},
          {name: 'heat',
            value: 'brightness(' + effectValue * 3}
        ];

        for (var i = 0; i < Math.min(oldEffect.length, 5); i++) {
          if (image.classList.contains('effect-' + oldEffect[i].name)) {
            var effect = oldEffect[i].value;
          }
          image.setAttribute('style', 'filter: ' + effect + ')');
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      return false;
    });
    var getCoords = function (elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    };
  };

  window.initializeFilters = {
    createEffect: function (uploadEffect, effectImagePreview, effectControls, thumbElem, sliderElem, sliderLine, changeEffect) {
      pickEffect(uploadEffect, effectControls, thumbElem, sliderLine, changeEffect);
      setEffect(effectImagePreview, thumbElem, sliderElem, sliderLine);
    }
  };
})();
