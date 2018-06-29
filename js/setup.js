'use strict';

window.setup = (function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarListTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var form = userDialog.querySelector('.setup-wizard-form');

  // var wizardNames = [
  //   'Иван',
  //   'Хуан Себастьян',
  //   'Мария',
  //   'Кристоф',
  //   'Виктор',
  //   'Юлия',
  //   'Люпита',
  //   'Вашингтон'
  // ];
  // var wizardSurnames = [
  //   'да Марья',
  //   'Верон',
  //   'Мирабелла',
  //   'Вальц',
  //   'Онопко',
  //   'Топольницкая',
  //   'Нионго',
  //   'Ирвинг'
  // ];
  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var NUMBER_OF_WIZARDS = 4;

  var getRandomElement = function (array) {
    var arrayElement = array[Math.floor(Math.random() * array.length)];
    return arrayElement;
  };

  // var generateName = function (names, surnames) {
  //   var fullname;
  //   var surname = getRandomElement(surnames);
  //   var name = getRandomElement(names);
  //   if (Math.random() > 0.5) {
  //     fullname = name + ' ' + surname;
  //   } else {
  //     fullname = surname + ' ' + name;
  //   }
  //   return fullname;
  // };

  // var generateWizards = function (name, surname, coatColor, eyesColor) {
  //   var newWizards = [];
  //   for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  //     var wizard = {
  //       name: generateName(name, surname),
  //       coatColor: getRandomElement(coatColor),
  //       eyesColor: getRandomElement(eyesColor)
  //     };
  //     newWizards.push(wizard);
  //   }
  //   return newWizards;
  // };

  // var wizards = generateWizards(wizardNames, wizardSurnames, coatColors, eyesColors);

  var renderWizard = function (wizard) {
    var wizardElement = similarListTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  function shuffle(array) {
    var randomIndex;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    var randomizedWizards = shuffle(wizards);
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(randomizedWizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 150px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%); font-size: 30px; color: black; background-color: red; text-align: center';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);


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
  // var playerSetup = document.querySelector('.setup-player');
  // почему не работает var playerFireballColor = playerColors.querySelector('.setup-fireball'); ?
  // setup.js:197 Uncaught TypeError: Cannot read property 'setAttribute' of null
  // at setColor (setup.js:197)
  // at HTMLDivElement.<anonymous> (setup.js:209)

  var playerColors = document.querySelector('.setup-wizard');
  var playerCoatColor = playerColors.querySelector('.wizard-coat');
  var playerEyesColor = playerColors.querySelector('.wizard-eyes');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var playerFireballColor = document.querySelector('.setup-fireball');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var pickColorArray = function (evt) {
    if (evt.target === playerCoatColor) {
      return coatColors;
    } else if (evt.target === playerEyesColor) {
      return eyesColors;
    } else {
      return fireballColors;
    }
  };

  var playerOutlookColors = [
    playerCoatColor,
    playerEyesColor
  ];

  var setColor = function (evt, inputField) {
    var blockColor = getRandomElement(pickColorArray(evt));
    var attribute;
    if (playerOutlookColors.includes(evt.target)) {
      attribute = 'fill: ';
      evt.target.setAttribute('style', attribute + blockColor);
    } else {
      attribute = 'background-color: ';
      evt.target.setAttribute('style', attribute + blockColor);
    }
    inputField.setAttribute('value', blockColor);
  };

  playerCoatColor.addEventListener('click', function (evt) {
    setColor(evt, inputCoatColor);
  });

  playerEyesColor.addEventListener('click', function (evt) {
    setColor(evt, inputEyesColor);
  });

  playerFireballColor.addEventListener('click', function (evt) {
    setColor(evt, inputFireballColor);
  });

  var sendSuccess = function () {
    userDialog.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), sendSuccess, onError);
    evt.preventDefault();
  });


  return {
    userDialog: userDialog,
    renderWizard: renderWizard,
    similarListElement: similarListElement
  };
})();
