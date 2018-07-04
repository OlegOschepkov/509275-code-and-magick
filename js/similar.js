'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];
  var DEBOUNCE_INTERVAL = 500;
  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.drawSimilar.renderAllWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    })
    );
  };

  // window.setup.wizardColorChangeHandlers.onEyesChange = debounce(function (color) {
  //   eyesColor = color;
  //   updateWizards();
  // });

  window.setup.wizardColorChangeHandlers.onEyesChange = function (color) {
    eyesColor = color;
    debounce(updateWizards());
  };

  // window.setup.wizardColorChangeHandlers.onCoatChange = debounce(function (color) {
  //   eyesColor = color;
  //   updateWizards();
  // });

  window.setup.wizardColorChangeHandlers.onCoatChange = function (color) {
    coatColor = color;
    debounce(updateWizards());
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.setup.onError);

  return {
    debounce: debounce,
    debounceInterval: DEBOUNCE_INTERVAL
  };
})();
