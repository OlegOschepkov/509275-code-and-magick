'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarListTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;
var wizards = [];

var generateName = function (names, surnames) {
  var fullname;
  var i = Math.floor(Math.random() * surnames.length);
  var j = Math.floor(Math.random() * names.length);
  if (Math.random() > 0.5) {
    fullname = surnames[i] + ' ' + names[j];
  } else {
    fullname = names[j] + ' ' + surnames[i];
  }
  return fullname;
};

var generationOf = function (colorOf) {
  var color = colorOf[Math.floor(Math.random() * colorOf.length)];
  return color;
};

var generateWizards = function (name, surname, coatColor, eyesColor) {
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    var wizard = {
      name: generateName(name, surname),
      coatColor: generationOf(coatColor),
      eyesColor: generationOf(eyesColor)
    };
    wizards.push(wizard);
  }
  return wizards;
};

generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, COATS_COLOR, EYES_COLOR);

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
