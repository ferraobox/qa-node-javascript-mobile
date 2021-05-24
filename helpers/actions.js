const wd = require('wd');
const PNGCrop = require('png-crop');
const fs = require('fs');
const resemble = require('../utils/resemble');
let pageObjectActions = require('../controllers/pageObjectAndroid');
pageObjectActions = new pageObjectActions();

//Custom methods for components
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
	let element = {};
	if (selector.includes('//')) element = await this.elementByXPath(selector);
	else if (selector.includes('com.') || selector.includes(':id')) element = await this.elementById(selector);
	else element = await this.elementByAccessibilityId(selector);
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
	const startX = Math.ceil(size.width * 0.5);
	const startY = Math.ceil(size.height * 0.2);
	const endY = Math.ceil(size.height * 0.5);
	const action = new wd.TouchAction(this);
	await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: startX, y: endY }).release().perform();
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
			if (data.misMatchPercentage <= percentage) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
};

exports.cropImage = function (width, heigth, top, left, imagePath) {
	/**
	 * @function cropImage
	 * @description Crops an image taking 4 position parameters. If paramaters aren't passed into the function, then it takes default parameters.
	 * @param {number} width Parameter as a number
	 * @param {number} heigth Parameter as a number
	 * @param {number} top Parameter as a number
	 * @param {number} left Parameter as a number
	 * @param {string} imagePath The path of the expected image for being cropped
	 */
	const config1 = { width: 400, height: 400, top: 60 };

	this.perform(function (done) {
		PNGCrop.crop(imagePath, imagePath, config1, function (err) {
			if (err) throw err;
			done();
		});
	});
	return this;
};

exports.elementOnWindow = async function (ele) {
	const size = await this.getWindowSize();
	const heightLimitTop = parseInt(Math.ceil(size.height * 0.1));
	const heightLimitBotton = process.env.OS === 'iOS' ? parseInt(Math.ceil(size.height * 0.8)) : parseInt(Math.ceil(size.height * 1));
	const location = await this.elementByXPath(ele).getLocation();
	console.log('\x1b[44m', '\x1b[37m', 'Window Top limit: ', heightLimitTop, '- Window Botton limit: ', heightLimitBotton, ' Location Element: ', location.y, '\x1b[0m');
	return location.y > heightLimitTop && location.y < heightLimitBotton ? true : false;
};

exports.elementExistXpath = async function (ele) {
	const elem = await this.elementsByXPath(ele);
	return elem.length > 0 ? true : false;
};

exports.elementExistId = async function (ele) {
	const elem = await this.elementsById(ele);
	return elem.length > 0 ? true : false;
};

exports.elementExistAccessibilityId = async function (ele) {
	const elem = await this.elementsByAccessibilityId(ele);
	return elem.length > 0 ? true : false;
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

exports.moveToDownXpath = async function (ele) {
	let currentTime = new Date().getTime();
	const size = await this.getWindowSize();
	const timeEnd = currentTime + 50000;
	let elementsFound = [];
	let elementFound = false;
	const startX = Math.ceil(size.width * 0.8);
	const startY = Math.ceil(size.height * 0.7);
	const endY = Math.ceil(size.height * 0.3);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1200).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.sleep(2000).elementsByXPath(ele);
		if (elementsFound.length > 0 && ele.search('/XCUIElementTypeSlider') < 0) {
			elementFound = await this.elementOnWindow(ele);
		} else {
			if (elementsFound.length > 0) elementFound = await this.elementOnWindow(ele);
			console.log('\x1b[44m', '\x1b[37m', 'ElementsFound.length > ', elementsFound.length, '\x1b[0m');
			if (elementsFound.length < 1 && ele.search('/XCUIElementTypeSlider') >= 0) {
				const eleAux = ele.replace('XCUIElementTypeSlider', 'XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeSlider');
				elementsFound = await this.elementsByXPath(eleAux);
				console.log('\x1b[44m', '\x1b[37m', 'ElementsFound.length Aux > ', elementsFound.length, '\x1b[0m');
				if (elementsFound.length > 0) elementFound = await this.elementOnWindow(eleAux);
			}
		}
	}
	return this;
};

exports.moveToDownAccessibilityId = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	const size = await this.getWindowSize();
	let elementsFound = [];
	let elementFound = false;
	const startX = Math.ceil(size.width * 0.9);
	const startY = Math.ceil(size.height * 0.8);
	const endY = Math.ceil(size.height * 0.3);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1200).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsByAccessibilityId(ele);
		if (elementsFound.length > 0) elementFound = await this.elementByAccessibilityId(ele).isDisplayed();
	}
	return this;
};

exports.moveToDownCss = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	const size = await this.getWindowSize();
	let elementsFound = [];
	let elementFound = false;
	const startX = Math.ceil(size.width * 0.9);
	const startY = Math.ceil(size.height * 0.8);
	const endY = Math.ceil(size.height * 0.3);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1200).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsByCss(ele);
		if (elementsFound.length > 0) elementFound = await this.elementByCss(ele).isDisplayed();
	}
	return this;
};

exports.moveToUpXpath = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	let elementsFound = [];
	let elementFound = false;
	const size = await this.getWindowSize();
	const startX = Math.ceil(size.width * 0.5);
	const startY = Math.ceil(size.height * 0.3);
	const endY = Math.ceil(size.height * 0.8);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.sleep(2000).elementsByXPath(ele);
		if (elementsFound.length > 0 && ele.search('/XCUIElementTypeSlider') < 0) {
			elementFound = await this.elementOnWindow(ele);
		} else {
			if (elementsFound.length > 0) elementFound = await this.elementOnWindow(ele);
			console.log('\x1b[44m', '\x1b[37m', 'ElementsFound.length > ', elementsFound.length, '\x1b[0m');
			if (elementsFound.length < 1 && ele.search('/XCUIElementTypeSlider') >= 0) {
				const eleAux = ele.replace('XCUIElementTypeSlider', 'XCUIElementTypeOther[1]/XCUIElementTypeOther[1]/XCUIElementTypeSlider');
				elementsFound = await this.elementsByXPath(eleAux);
				console.log('\x1b[44m', '\x1b[37m', 'ElementsFound.length Aux > ', elementsFound.length, '\x1b[0m');
				if (elementsFound.length > 0) elementFound = await this.elementOnWindow(eleAux);
			}
		}
	}
	return this;
};

exports.moveToUpAccessibilityId = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	let elementsFound = [];
	let elementFound = false;
	const size = await this.getWindowSize();
	const startX = Math.ceil(size.width * 0.8);
	const startY = Math.ceil(size.height * 0.2);
	const endY = Math.ceil(size.height * 0.8);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsByAccessibilityId(ele);
		if (elementsFound.length > 0) elementFound = await this.elementByAccessibilityId(ele).isDisplayed();
	}
	return this;
};

exports.moveToUpCss = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	let elementsFound = [];
	let elementFound = false;
	const size = await this.getWindowSize();
	const startX = Math.ceil(size.width * 0.8);
	const startY = Math.ceil(size.height * 0.2);
	const endY = Math.ceil(size.height * 0.8);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsByCss(ele);
		if (elementsFound.length > 0) elementFound = await this.elementByCss(ele).isDisplayed();
	}
	return this;
};

exports.slideToRightXpath = async function (ele, _startPosition) {
	//start position should be percentage 0 - 1, if you want 50%, you should write 0,5
	const startPosition = _startPosition || 0;
	const sizeElement = await this.waitForElementByXPath(ele, 20000).elementByXPath(ele).getSize();
	const location = await this.elementByXPath(ele).getLocation();
	const action = new wd.TouchAction(this);
	console.log('Dimensiones: ', sizeElement.width, '-', sizeElement.height, ' Location: ', location.x, '-', location.y);
	const xposition = sizeElement.width * startPosition;
	// const startX = Math.ceil(location.x + xposition + 11);
	const savebackaction = process.env.OS === 'iOS' ? 22 : 11;
	const startX = Math.ceil(location.x + xposition + savebackaction);
	const startY = Math.ceil(location.y + savebackaction);
	const endX = Math.ceil(sizeElement.width - xposition + startX);
	console.log('Touch before: ', startX, '-', startY, ' Touch after: ', endX, '-', startY);
	await action.press({ x: startX, y: startY }).wait(700).moveTo({ x: endX, y: startY }).release().perform();
	return this;
};

exports.slideToLeftXpath = async function (ele, _startPosition) {
	//start position should be percentage 0 - 1, if you want 50%, you should write 0,5
	const startPosition = _startPosition || 0;
	const sizeElement = await this.waitForElementByXPath(ele, 20000).elementByXPath(ele).getSize();
	const location = await this.elementByXPath(ele).getLocation();
	const action = new wd.TouchAction(this);
	console.log('Dimensiones: ', sizeElement.width, '-', sizeElement.height, ' Location: ', location.x, '-', location.y);
	const xposition = sizeElement.width * startPosition;
	// const startX = Math.ceil(location.x + xposition + 11);
	const savebackaction = process.env.OS === 'iOS' && startPosition === 1 ? -22 : process.env.OS === 'iOS' ? 22 : 11;
	const startX = Math.ceil(location.x + xposition + savebackaction);
	const startY = Math.ceil(location.y + 11);
	const endX = process.env.OS === 'iOS' ? 0 - Math.ceil(xposition) : location.x;
	console.log('Touch before: ', startX, '-', startY, ' Touch after: ', endX, '-', startY);
	await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: endX, y: startY }).release().perform();
	return this;
};

exports.slideToXpath = async function (ele, _startPosition, _increment) {
	// Start position should be percentage 0 - 1, if you want 50%, you should write 0,5
	const startPosition = _startPosition || 0;

	// Increment should be between -1 and 1. Slide right: [0, 1]. Slide left: [0, -1]
	const increment = _increment || 0.25;

	const sizeElement = await this.waitForElementByXPath(ele, 30000).elementByXPath(ele).getSize();
	const location = await this.elementByXPath(ele).getLocation();
	const action = new wd.TouchAction(this);
	console.log('Dimensiones: ', sizeElement.width, '-', sizeElement.height, ' Location: ', location.x, '-', location.y);

	// Radius of slider
	const sliderHandleHalfSize = process.env.OS === 'iOS' ? 22 : 11;

	// Two times the slider radius is substracted from the element's width
	const elementEffectiveWidth = sizeElement.width - 2 * sliderHandleHalfSize;

	const offsetStartPosition = elementEffectiveWidth * startPosition;
	const startX = Math.ceil(location.x + sliderHandleHalfSize + offsetStartPosition);
	const startY = Math.ceil(location.y + sliderHandleHalfSize);

	const offsetEndPosition = elementEffectiveWidth * increment;
	const endX = Math.ceil(startX + offsetEndPosition);

	console.log('Touch before: ', startX, '-', startY, ' Touch after: ', endX, '-', startY);
	await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: endX, y: startY }).release().perform();
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
exports.tapAddress = async function () {
	const action = new wd.TouchAction(this);
	const size = await this.getWindowSize();
	const x = Math.ceil(size.width * 0.5);
	const y = Math.ceil(size.height * 0.4);
	console.log(`* Tab on point: x: ${x}, y: ${y}`.yellow);
	return action.tap({ x: x, y: y }).perform();
};

exports.tabElementXpath = async function (ele) {
	const action = new wd.TouchAction(this);
	const location = await this.elementByXPath(ele).getLocation();
	const sizeElement = await this.elementByXPath(ele).getSize();
	const x = parseInt(location.x + sizeElement.width / 2);
	const y = parseInt(location.y + sizeElement.height / 2);
	console.log(`* Tab on point: x: ${x}, y: ${y}`.yellow);
	return action.tap({ x: x, y: y }).perform();
};

exports.tabElementId = async function (ele) {
	const action = new wd.TouchAction(this);
	const location = await this.elementById(ele).getLocation();
	const sizeElement = await this.elementById(ele).getSize();
	const x = parseInt(location.x + sizeElement.width / 2);
	const y = parseInt(location.y + sizeElement.height / 2);
	return action.tap({ x: x, y: y }).perform();
};

exports.tabElementAccessibilityId = async function (ele) {
	const action = new wd.TouchAction(this);
	const location = await this.elementByAccessibilityId(ele).getLocation();
	const sizeElement = await this.elementByAccessibilityId(ele).getSize();
	const x = parseInt(location.x + sizeElement.width / 2);
	const y = parseInt(location.y + sizeElement.height / 2);
	return action.tap({ x: x, y: y }).perform();
};

exports.moveToDownId = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 25000;
	const size = await this.getWindowSize();
	let elementsFound = [];
	let elementFound = false;
	const startX = Math.ceil(size.width * 0.9);
	const startY = Math.ceil(size.height * 0.8);
	const endY = Math.ceil(size.height * 0.3);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1200).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsById(ele);
		if (elementsFound.length > 0) elementFound = await this.elementById(ele).isDisplayed();
	}
	return this;
};

exports.moveToUpId = async function (ele) {
	let currentTime = new Date().getTime();
	const timeEnd = currentTime + 20000;
	let elementsFound = [];
	let elementFound = false;
	const size = await this.getWindowSize();
	const startX = Math.ceil(size.width * 0.8);
	const startY = Math.ceil(size.height * 0.2);
	const endY = Math.ceil(size.height * 0.8);
	while (currentTime < timeEnd && elementFound === false) {
		currentTime = new Date().getTime();
		const action = new wd.TouchAction(this);
		await action.press({ x: startX, y: startY }).wait(1000).moveTo({ x: startX, y: endY }).release().perform();
		elementsFound = await this.elementsById(ele);
		if (elementsFound.length > 0) elementFound = await this.elementById(ele).isDisplayed();
	}
	return this;
};

exports.signature = async function (ele) {
	let sizeElement = {};
	let location = {};
	if (ele.includes('//')) {
		sizeElement = await driver.waitForElementByXPath(ele, 20000).elementByXPath(ele).getSize();
		location = await driver.waitForElementByXPath(ele).getLocation();
	} else if (ele.includes('com.') || ele.includes(':id')) {
		sizeElement = await this.waitForElementById(ele, 20000).elementById(ele).getSize();
		location = await this.elementById(ele).getLocation();
	} else {
		sizeElement = await this.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).getSize();
		location = await this.elementByAccessibilityId(ele).getLocation();
	}
	//Face
	const actionFace = new wd.TouchAction(this);
	const radius = parseInt((sizeElement.height / 2) * 0.7);
	const origin = { x: parseInt(location.x + sizeElement.width / 2), y: parseInt(location.y + (sizeElement.height * 0.8) / 2) };
	await drawCircle(actionFace, radius, origin);
	//Eye LEFT
	const actionLEye = new wd.TouchAction(this);
	const radiusLE = parseInt((sizeElement.height / 2) * 0.2);
	const originLE = { x: parseInt(location.x + sizeElement.width / 2 - 25), y: parseInt(location.y + (sizeElement.height * 0.4) / 2) };
	await drawCircle(actionLEye, radiusLE, originLE);
	//Eye RIGHT
	const actionREye = new wd.TouchAction(this);
	const radiusRE = parseInt((sizeElement.height / 2) * 0.2);
	const originRE = { x: parseInt(location.x + sizeElement.width / 2 + 25), y: parseInt(location.y + (sizeElement.height * 0.4) / 2) };
	await drawCircle(actionREye, radiusRE, originRE);
	//smile
	const actionSmile = new wd.TouchAction(this);
	const radiusSmile = parseInt((sizeElement.height / 2) * 0.4);
	const originSmile = { x: parseInt(location.x + sizeElement.width / 2), y: parseInt(location.y + (sizeElement.height * 0.8) / 2) };
	await drawSemiCircle(actionSmile, radiusSmile, originSmile);
	return this;
};

async function drawCircle(action, radius, origin) {
	const pointA = await getPoint(1, 30, origin, radius);
	await action.press({ x: pointA.x, y: pointA.y });
	for (let index = 2; index <= 30; index++) {
		const pointB = await getPoint(index, 30, origin, radius);
		await action.wait(100).moveTo({ x: pointB.x, y: pointB.y });
	}
	return action.release().perform();
}

async function drawSemiCircle(action, radius, origin) {
	const pointA = await getPoint(1, 30, origin, radius);
	await action.press({ x: pointA.x, y: pointA.y });
	for (let index = 2; index <= 15; index++) {
		const pointB = await getPoint(index, 30, origin, radius);
		await action.wait(200).moveTo({ x: pointB.x, y: pointB.y });
	}
	return action.release().perform();
}

async function getPoint(step, totalSteps, origin, radius) {
	const theta = 2 * Math.PI * (step / totalSteps);
	const x = await parseInt(Math.floor(Math.cos(theta) * radius));
	const y = await parseInt(Math.floor(Math.sin(theta) * radius));
	return { x: parseInt(origin.x + x), y: parseInt(origin.y + y) };
}
