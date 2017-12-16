'use strict';

(function () {
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;

  var setResizeValue = function (number, action, dec, inc) {
    var value = number.getAttribute('value');
    dec.addEventListener('click', function () {
      if (value <= MAX_VALUE && value > MIN_VALUE) {
        value = +value - MIN_VALUE;
        number.setAttribute('value', value);
        action(value);
      }
    });
    inc.addEventListener('click', function () {
      if (value < MAX_VALUE && value >= MIN_VALUE) {
        value = +value + MIN_VALUE;
        number.setAttribute('value', value);
        action(value);
      }
    });
  };
  window.initializeScale = {
    setSize: setResizeValue
  };
})();
