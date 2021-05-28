const wd = require('wd');
const PNGCrop = require('png-crop');
const fs = require('fs');
const resemble = require('../utils/resemble');
const coreActionsString = `pageObject${process.env.OS}`;
let pageObjectActions = require(`../controllers/${coreActionsString}`);
pageObjectActions = new pageObjectActions();

//Custom methods for components

exports.elementExist = async function (ele, css) {
  let elements = [];
  if (css) elements = await this.elementsByCss(ele);
  else if (ele.includes('//')) elements = await this.elementsByXPath(ele);
  else if (ele.includes('com.') || ele.includes(':id')) elements = await this.elementsById(ele);
  else elements = await this.elementsByAccessibilityId(ele);
  return elements.length > 0;
};

exports.getWebElement = function (selector) {
  if (selector.includes('//')) return this.elementByXPath(selector);
  else if (selector.includes('com.') || selector.includes(':id')) return this.elementById(selector);
  else return this.elementByAccessibilityId(selector);
};

exports.addPhotosToDevice = function (photoPath, namePhoto) {
  return new Promise((resolve, reject) => {
    fs.readFile(photoPath, 'base64', (err, data) => {
      if (err) reject(err); // Fail if the file can't be read.
      const pathfle = process.env.OS === 'Android' ? `./sdcard/Download/${namePhoto}` : namePhoto;
      this.pushFileToDevice(pathfle, data).then(() => resolve(this));
    });
  });
};

exports.clean = async function (selector) {
  const element = this.getWebElement(selector);
  const value = await element.getAttribute(process.env.OS === 'Android' ? 'text' : 'value');
  if (value === null || value === '') return element;
  else {
    if (process.env.OS === 'Android') await element.clear();
    else await element.sendKeys(new Array(value.length).fill('\b').join(''));
    return element;
  }
};

exports.pullToRefresh = async function () {
  const size = await this.getWindowSize();
  const coordinates = getCoordinates(size, 'up');
  const action = new wd.TouchAction(this);
  await action.press({ x: coordinates.startX, y: coordinates.startY }).wait(1000).moveTo({ x: coordinates.startX, y: coordinates.endY }).release().perform();
  return this;
};

exports.screenShot = function (name) {
  return new Promise((resolve, reject) => {
    this.takeScreenshot().then((png) => {
      const filename = `./images/${name}${process.env.DEVICE}.png`;
      console.log(filename);
      fs.writeFile(filename, png, 'base64', (err) => {
        if (err) reject(err);
        resolve(filename);
      });
    });
  });
};

exports.compareScreenshots = function (screenshot1, screenshot2, percentage) {
  /**
   * @function compareScreenshots
   * @description Compares two screenshots and validates that they look equal.
   * @param {string} screenshot1 Path to the first screenshot to compare
   * @param {string} screenshot2 Path to the second screenshot to compare
   * @param {number} percentage maximum percentage of error accepted to compare the two screenshots
   * @param {string} message Message if the images are equal
   * @returns {boolean}
   */
  return new Promise((resolve) => {
    resemble(screenshot1, screenshot2).then((data) => {
      console.log('Mismatch percentage is ', data.misMatchPercentage);
      if (data.misMatchPercentage <= percentage) resolve(true);
      else resolve(false);
    });
  });
};

exports.cropImage = function (_config, imagePath) {
  /**
   * @function cropImage
   * @description Crops an image taking 4 position parameters. If paramaters aren't passed into the function, then it takes default parameters.
   * @param {number} width Parameter as a number
   * @param {number} heigth Parameter as a number
   * @param {number} top Parameter as a number
   * @param {number} left Parameter as a number
   * @param {string} imagePath The path of the expected image for being cropped
   */
  const config = _config || { width: 400, height: 400, top: 60 };
  return this.perform(function (done) {
    PNGCrop.crop(imagePath, imagePath, config, function (err) {
      if (err) throw err;
      done();
    });
  });
};

exports.elementOnWindow = async function (ele) {
  const size = await this.getWindowSize();
  const heightLimitTop = parseInt(Math.ceil(size.height * 0.1));
  const heightLimitBotton = process.env.OS === 'iOS' ? parseInt(Math.ceil(size.height * 0.8)) : parseInt(Math.ceil(size.height * 1));
  const location = await this.elementByXPath(ele).getLocation();
  console.log('\x1b[44m', '\x1b[37m', 'Window Top limit: ', heightLimitTop, '- Window Botton limit: ', heightLimitBotton, ' Location Element: ', location.y, '\x1b[0m');
  return location.y > heightLimitTop && location.y < heightLimitBotton ? true : false;
};

exports.hideKeyboardTouch = async function () {
  const size = await this.getWindowSize();
  const startX = Math.ceil(size.width * 0.9);
  const startY = Math.ceil(size.height * 0.3);
  const endY = Math.ceil(size.height * 0.1);
  const action = new wd.TouchAction(this);
  await action.press({ x: startX, y: startY }).wait(1200).moveTo({ x: startX, y: endY }).release().perform();
  return this;
};

exports.clickSendKeyboard = function () {
  return this.waitForElementByAccessibilityId('Send', 20000).elementByAccessibilityId('Send').click();
};

//MOVE TO
function getCoordinates(size, dir) {
  const directions = {
    down: {
      startX: Math.ceil(size.width * 0.9),
      startY: Math.ceil(size.height * 0.8),
      endX: Math.ceil(size.height * 0.3),
      endY: Math.ceil(size.height * 0.3),
    },
    up: {
      startX: Math.ceil(size.width * 0.8),
      startY: Math.ceil(size.height * 0.2),
      endX: Math.ceil(size.height * 0.8),
      endY: Math.ceil(size.height * 0.8),
    },
  };

  return directions[dir];
}

async function getMoveToContext() {
  const currentTime = new Date().getTime();
  const size = await this.getWindowSize();
  const timeEnd = currentTime + 50000;
  const time = { currentTime: currentTime, timeEnd: timeEnd };
  return { time, size };
}

async function moveToAction(time, coordinates, ele) {
  const timeEnd = time.timeEnd;
  let currentTime = time.currentTime;
  elementsFound = [];
  while (currentTime < timeEnd && elementsFound.length <= 0) {
    currentTime = new Date().getTime();
    const action = new wd.TouchAction(this);
    await action.press({ x: coordinates.startX, y: coordinates.startY }).wait(1200).moveTo({ x: coordinates.endX, y: coordinates.endY }).release().perform();
    elementsFound = await this.elementExist(ele);
  }
}

exports.moveToDown = async function (ele) {
  const { time, size } = await getMoveToContext();
  const coordinates = getCoordinates(size, 'down');
  await moveToAction(time, coordinates, ele);
  return this;
};

exports.moveToUp = async function (ele) {
  const { time, size } = await getMoveToContext();
  const coordinates = getCoordinates(size, 'up');
  await moveToAction(time, coordinates, ele);
  return this;
};

exports.swipeTo = async function (direction) {
  const size = await this.getWindowSize();
  const startY = Math.ceil(size.height * 0.3);
  //Default right swipe
  const startX = Math.ceil(size.width * 0.1);
  const endX = Math.ceil(size.width * 0.9);
  const action = new wd.TouchAction(this);
  await action
    .press({ x: direction === 'right' ? startX : endX, y: startY })
    .wait(1000)
    .moveTo({ x: direction === 'right' ? endX : startX, y: startY })
    .release()
    .perform();
  return this;
};

exports.movePickerElement = async function (ele, dir) {
  const action = new wd.TouchAction(driver);
  const location = await pageObjectActions.getElementLocation(ele);
  const sizeElement = await pageObjectActions.getElementSize(ele);
  const x = parseInt(location.x + sizeElement.width / 2);
  const y = parseInt(location.y + sizeElement.height / 2);
  const endY = dir === 'down' ? y - sizeElement.height : y + sizeElement.height;
  console.log('start y:', y, 'end y:', endY);
  return action.press({ x: x, y: y }).wait(1000).moveTo({ x: x, y: endY }).release().perform();
};

//Custom methos for actions
exports.pinch = function (el) {
  return Promise.all([el.getSize(), el.getLocation()]).then(
    function (res) {
      const size = res[0];
      const loc = res[1];
      const center = {
        x: loc.x + size.width / 2,
        y: loc.y + size.height / 2,
      };
      const a1 = new wd.TouchAction(this);
      a1.press({ el: el, x: center.x, y: center.y - 100 })
        .moveTo({ el: el })
        .release();
      const a2 = new wd.TouchAction(this);
      a2.press({ el: el, x: center.x, y: center.y + 100 })
        .moveTo({ el: el })
        .release();
      const m = new wd.MultiAction(this);
      m.add(a1, a2);
      return m.perform();
    }.bind(this)
  );
};

//Android Methods
async function getTabCoordinates(ele) {
  const location = await this.elementByXPath(ele).getLocation();
  const sizeElement = await this.elementByXPath(ele).getSize();
  const x = parseInt(location.x + sizeElement.width / 2);
  const y = parseInt(location.y + sizeElement.height / 2);
  console.log(`* Tab on point: x: ${x}, y: ${y}`.yellow);
  return { x, y };
}

exports.tap = function (ele) {
  const action = new wd.TouchAction(this);
  const { x, y } = getTabCoordinates(ele);
  return action.tap({ x: x, y: y }).perform();
};

//Sign
exports.signature = async function (ele) {
  const sizeElement = await getSizeElement(ele);
  const location = await getLocation(ele);
  //Face
  await actionCircle(sizeElement, location, 0.7, 0.8, 2);
  //Eye LEFT
  await actionCircle(sizeElement, location, 0.2, 0.4, 2 - 25);
  //Eye RIGHT
  await actionCircle(sizeElement, location, 0.2, 0.4, 2 + 25);
  //smile
  await actionSemiCircle(sizeElement, location, 0.4, 0.8, 2);
  return this;
};

function getSizeElement(ele) {
  if (ele.includes('//')) return driver.waitForElementByXPath(ele, 20000).elementByXPath(ele).getSize();
  else if (ele.includes('com.') || ele.includes(':id')) return this.waitForElementById(ele, 20000).elementById(ele).getSize();
  else return this.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).getSize();
}

function getLocation(ele) {
  if (ele.includes('//')) return driver.waitForElementByXPath(ele).getLocation();
  else if (ele.includes('com.') || ele.includes(':id')) return this.elementById(ele).getLocation();
  else return this.elementByAccessibilityId(ele).getLocation();
}

function actionCircle(sizeElement, location, RHeight, OHeight, OWidth) {
  const actionFace = new wd.TouchAction(this);
  const radius = parseInt((sizeElement.height / 2) * RHeight);
  const origin = { x: parseInt(location.x + sizeElement.width / OWidth), y: parseInt(location.y + (sizeElement.height * OHeight) / 2) };
  return drawCircle(actionFace, radius, origin);
}

function actionSemiCircle(sizeElement, location, RHeight, OHeight, OWidth) {
  const actionFace = new wd.TouchAction(this);
  const radius = parseInt((sizeElement.height / 2) * RHeight);
  const origin = { x: parseInt(location.x + sizeElement.width / OWidth), y: parseInt(location.y + (sizeElement.height * OHeight) / 2) };
  return drawSemiCircle(actionFace, radius, origin);
}

async function drawCircle(action, radius, origin) {
  const pointA = getPoint(1, 30, origin, radius);
  await action.press({ x: pointA.x, y: pointA.y });
  for (let index = 2; index <= 30; index++) {
    const pointB = getPoint(index, 30, origin, radius);
    await action.wait(100).moveTo({ x: pointB.x, y: pointB.y });
  }
  return action.release().perform();
}

async function drawSemiCircle(action, radius, origin) {
  const pointA = getPoint(1, 30, origin, radius);
  await action.press({ x: pointA.x, y: pointA.y });
  for (let index = 2; index <= 15; index++) {
    const pointB = getPoint(index, 30, origin, radius);
    await action.wait(200).moveTo({ x: pointB.x, y: pointB.y });
  }
  return action.release().perform();
}

function getPoint(step, totalSteps, origin, radius) {
  const theta = 2 * Math.PI * (step / totalSteps);
  const x = parseInt(Math.floor(Math.cos(theta) * radius));
  const y = parseInt(Math.floor(Math.sin(theta) * radius));
  return { x: parseInt(origin.x + x), y: parseInt(origin.y + y) };
}
