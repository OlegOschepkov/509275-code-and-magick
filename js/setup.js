'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarListTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
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
var NUMBER_OF_WIZARDS = 4;

var getRandomElement = function (array) {
  var arrayElement = array[Math.floor(Math.random() * array.length)];
  return arrayElement;
};

var generateName = function (names, surnames) {
  var fullname;
  var i = getRandomElement(surnames);
  var j = getRandomElement(names);
  if (Math.random() > 0.5) {
    fullname = surnames[i] + ' ' + names[j];
  } else {
    fullname = names[j] + ' ' + surnames[i];
  }
  return fullname;
};

var generateWizards = function (name, surname, coatColor, eyesColor) {
  var newWizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var wizard = {
      name: generateName(name, surname),
      coatColor: getRandomElement(coatColor),
      eyesColor: getRandomElement(eyesColor)
    };
    newWizards.push(wizard);
  }
  return newWizards;
};

var wizards = generateWizards(wizardNames, wizardSurnames, coatColors, eyesColors);

var renderWizard = function (wizard) {
  var wizardElement = similarListTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
