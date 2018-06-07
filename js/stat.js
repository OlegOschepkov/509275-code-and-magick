'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 25;
var BAR_BLOCK_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';
var CLOUD_COLOR = '#fff';
var TEXT_COLOR = '#000';
var TEXT_LINE_1ST = 'Ура вы победили!';
var TEXT_LINE_2ND = 'Список результатов:';
var YOUR_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var OTHER_BAR_COLOR = 'rgba(5, 7, 255,'; // Перенес конец строки с рандомом в цикл, чтобы разнообразить цвета.

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getBarColor = function (ctx, name) {
  if (name === 'Вы') {
    ctx.fillStyle = YOUR_BAR_COLOR;
  } else {
    ctx.fillStyle = OTHER_BAR_COLOR + Math.random() + ')';
  }
};

var renderBar = function (ctx, x, y, width, height, name) {
  getBarColor(ctx, name);
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(TEXT_LINE_1ST, CLOUD_X + GAP, FONT_GAP);
  ctx.fillText(TEXT_LINE_2ND, CLOUD_X + GAP, FONT_GAP + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barX = CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = (BAR_BLOCK_HEIGHT * times[i]) / maxTime; //
    var barY = CLOUD_Y + FONT_GAP * 2 + BAR_BLOCK_HEIGHT - barHeight;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], barX, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.floor(times[i]), barX, barY);

    renderBar(ctx, barX, barY + GAP, BAR_WIDTH, barHeight, names[i]);
  }
};
