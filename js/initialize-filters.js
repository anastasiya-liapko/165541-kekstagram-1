'use strict';

window.initializeFilters = (function () {
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
      for (var i = 0; i < oldEffects.length; i++) {
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
    pin.addEventListener('mousedown', function (evt) {
      var sliderCoords = getCoords(line);

      var onMouseMove = function (moveEvt) {
        var newLeft = moveEvt.pageX - sliderCoords.left;
        if (newLeft < 0) {
          newLeft = 0;
        }
        var rightEdge = line.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
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

        for (var i = 0; i < oldEffect.length; i++) {
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
    function getCoords(elem) {
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };

  return {
    createEffect: function (object) {
      pickEffect(object[0], object[2], object[3], object[5], object[6]);
      setEffect(object[1], object[3], object[4], object[5]);
    }
  };
})();
