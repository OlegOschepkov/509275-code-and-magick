'use strict';

window.setup = (function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarListTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var form = userDialog.querySelector('.setup-wizard-form');

  var coatColors = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];
  var eyesColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  // var NUMBER_OF_WIZARDS = 4;

  var getRandomElement = function (array) {
    var arrayElement = array[Math.floor(Math.random() * array.length)];
    return arrayElement;
  };

  // function shuffle(array) {
  //   var randomIndex;
  //   var temp;
  //   for (var i = array.length - 1; i > 0; i--) {
  //     randomIndex = Math.floor(Math.random() * (i + 1));
  //     temp = array[i];
  //     array[i] = array[randomIndex];
  //     array[randomIndex] = temp;
  //   }
  //   return array;
  // }

  // var onLoad = function (wizards) {
  //   var fragment = document.createDocumentFragment();
  //   var randomizedWizards = shuffle(wizards);
  //   for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  //     fragment.appendChild(window.render.renderWizard(randomizedWizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);
  //
  //   userDialog.querySelector('.setup-similar').classList.remove('hidden');
  // };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 150px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%); font-size: 30px; color: black; background-color: red; text-align: center';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // открытие/закрытие окна настройки персонажа

  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  userDialogOpen.addEventListener('click', function () {
    userDialog.classList.remove('hidden');
  });

  userDialogClose.addEventListener('click', function () {
    userDialog.classList.add('hidden');
  });

  var onPopupEscPress = function (evt) {
    if (evt.target !== userNameInput && evt.keyCode === ESC_KEYCODE) {
      closePopup();
    } else {
      return;
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userDialog.removeAttribute('style');
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  // Покрасочный цех

  var playerColors = document.querySelector('.setup-wizard');
  var playerCoatColor = playerColors.querySelector('.wizard-coat');
  var playerEyesColor = playerColors.querySelector('.wizard-eyes');
  // var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  // var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var playerFireballColor = document.querySelector('.setup-fireball');
  // var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var pickColorArray = function (evt) {
    if (evt.target === playerCoatColor) {
      return coatColors;
    } else if (evt.target === playerEyesColor) {
      return eyesColors;
    } else {
      return fireballColors;
    }
  };

  var playerOutlookColors = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    },
    onFireballchange: function (color) {
      return color;
    }
  };

  var setWizardElementColor = function (evt, callback) {
    var blockColor = getRandomElement(pickColorArray(evt));
    var attribute;
    if (evt.target.classList.contains('setup-fireball')) {
      attribute = 'background-color: ';
      evt.target.setAttribute('style', attribute + blockColor);
    } else {
      attribute = 'fill: ';
      evt.target.setAttribute('style', attribute + blockColor);
    }
    callback(blockColor);
  };

  playerCoatColor.addEventListener('click', function (evt) {
    setWizardElementColor(evt, playerOutlookColors.onCoatChange);
  });

  playerEyesColor.addEventListener('click', function (evt) {
    setWizardElementColor(evt, playerOutlookColors.onEyesChange);
  });

  playerFireballColor.addEventListener('click', function (evt) {
    setWizardElementColor(evt, playerOutlookColors.onFireballchange);
  });

  var sendSuccess = function () {
    userDialog.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), sendSuccess, onError);
    evt.preventDefault();
  });

  var wizardColorChangeHandlers = playerOutlookColors;

  return {
    userDialog: userDialog,
    similarListElement: similarListElement,
    onError: onError,
    similarListTemplate: similarListTemplate,
    getRandomElement: getRandomElement,
    wizardColorChangeHandlers: wizardColorChangeHandlers
  };
})();
