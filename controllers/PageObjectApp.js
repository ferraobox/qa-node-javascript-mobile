module.exports = class PageObjectApp {
	constructor() {}

	// * Click element

	clickByAccessibilityId(ele) {
		return driver.waitForElementByAccessibilityId(ele, 20000, `${ele} is not clickable`).elementByAccessibilityId(ele).click();
	}

	clickById(ele) {
		return driver.waitForElementById(ele, 20000, `${ele} is not clickable`).elementById(ele).click();
	}

	clickByXPath(ele) {
		return driver.waitForElementByXPath(ele, 20000, `${ele} is not clickable`).elementByXPath(ele).click();
	}

	// * Element displayed

	elementDisplayedById(ele) {
		return driver.sleep(3000).waitForElementById(ele, 20000, `${ele} is not displayed`).elementById(ele).isDisplayed();
	}

	elementDisplayedByAccessibilityId(ele) {
		return driver.sleep(3000).waitForElementByAccessibilityId(ele, 20000, `${ele} is not displayed`).elementByAccessibilityId(ele).isDisplayed();
	}

	elementDisplayedByXPath(ele) {
		return driver.sleep(3000).waitForElementByXPath(ele, 20000, `${ele} is not displayed`).elementByXPath(ele).isDisplayed();
	}

	// Move to down

	moveToDownToAid(ele) {
		return driver.moveToDownAccessibilityId(ele).sleep(2000);
	}

	moveToDownXpath(ele) {
		return driver.moveToDownXpath(ele).sleep(2000);
	}

	moveToDownId(ele) {
		return driver.moveToDownId(ele);
	}

	// Move to up

	moveToUpId(ele) {
		return driver.moveToUpId(ele).sleep(2000);
	}

	moveToUpXpath(ele) {
		return driver.moveToUpXpath(ele).sleep(2000);
	}

	moveToUpToAid(ele) {
		return driver.moveToUpAccessibilityId(ele).sleep(2000);
	}

	moveToExecuteUP() {
		return driver.execute('mobile: scroll', { direction: 'up' });
	}
	moveToExecuteDown() {
		return driver.execute('mobile: scroll', { direction: 'down' });
	}

	// Get attribute

	getAttributeByXPath(ele, att) {
		return driver.waitForElementByXPath(ele, 10000).elementByXPath(ele).getAttribute(att);
	}

	getAttributeById(ele, att) {
		return driver.waitForElementById(ele, 20000).elementById(ele).getAttribute(att);
	}

	getAttributeByAccessibilityId(ele, att) {
		return driver.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).getAttribute(att);
	}

	// Fill text

	fillTextByAccessibilityId(ele, text) {
		return driver.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).click().clean(ele).sendKeys(text).hideKeyboardTouch();
	}

	fillTextById(ele, text) {
		return driver.waitForElementById(ele, 40000).elementById(ele).click().clean(ele).sendKeys(text).hideDeviceKeyboard();
	}

	async fillTextByXPath(ele, text) {
		await driver.waitForElementByXPath(ele, 10000).elementByXPath(ele).click().clean(ele).sendKeys(text);
		return process.env.OS === 'iOS' ? driver.hideKeyboardTouch() : driver.hideDeviceKeyboard();
	}

	//Element Exist

	elementExistById(ele) {
		return driver.elementExistId(ele);
	}

	elementExistByAccessibilityId(ele) {
		return driver.elementExistAccessibilityId(ele);
	}

	elementExistByXpath(ele) {
		return driver.elementExistXpath(ele);
	}

	//Get elements
	getElementsByXPath(ele) {
		return driver.elementsByXPath(ele);
	}

	getElementsById(ele) {
		return driver.elementsById(ele);
	}

	getElementsByAccessibilityId(ele) {
		return driver.elementsByAccessibilityId(ele);
	}

	//Element get Size
	getSizeByXPath(ele) {
		return driver.elementByXPath(ele).getSize();
	}

	getSizeById(ele) {
		return driver.elementById(ele).getSize();
	}

	getSizeByAccessibilityId(ele) {
		return driver.elementByAccessibilityId(ele).getSize();
	}

	//Element get Location
	getLocationByXPath(ele) {
		return driver.elementByXPath(ele).getLocation();
	}

	getLocationById(ele) {
		return driver.elementById(ele).getLocation();
	}

	getLocationByAccessibilityId(ele) {
		return driver.elementByAccessibilityId(ele).getLocation();
	}

	//Check if elements exists and return true or false catching any possible exception
	checkElementExistByXPath(element) {
		return driver
			.elementByXPath(element)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}
	checkElementExistById(element) {
		return driver
			.elementById(element)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}
	checkElementExistByAccessibilityId(element) {
		return driver
			.elementByAccessibilityId(element)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}
};
