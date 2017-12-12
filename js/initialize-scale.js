'use strict';

(function () {
  var setResizeValue = function (number, action, dec, inc) {
    var value = number.getAttribute('value');
    dec.addEventListener('click', function () {
      if (value <= 100 && value > 25) {
        value = +value - 25;
        number.setAttribute('value', value);
        action(value);
      }
    });
    inc.addEventListener('click', function () {
      if (value < 100 && value >= 25) {
        value = +value + 25;
        number.setAttribute('value', value);
        action(value);
      }
    });
  };
  window.initializeScale = {
    setSize: setResizeValue
  };
})();
