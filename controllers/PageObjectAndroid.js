const PageObjectApp = require('./PageObjectApp');
module.exports = class PageObjectAndroid extends PageObjectApp {
	constructor() {
		super();
	}

	// * Click element

	elementDisplayedBy(ele) {
		if (ele.includes('//')) return super.elementDisplayedByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.elementDisplayedById(ele);
		else return super.elementDisplayedByAccessibilityId(ele);
	}

	clickBy(ele) {
		if (ele.includes('//')) return super.clickByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.clickById(ele);
		else return super.clickByAccessibilityId(ele);
	}

	fillTextBy(ele, text) {
		if (ele.includes('//')) return super.fillTextByXPath(ele, text);
		else if (ele.includes('com.') || ele.includes(':id')) return super.fillTextById(ele, text);
		else return super.fillTextByAccessibilityId(ele, text);
	}

	getAttributeBy(ele, att) {
		if (ele.includes('//')) return super.getAttributeByXPath(ele, att);
		else if (ele.includes('com.') || ele.includes(':id')) return super.getAttributeById(ele, att);
		else return super.getAttributeByAccessibilityId(ele, att);
	}

	elementExistBy(ele) {
		if (ele.includes('//')) return super.elementExistByXpath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.elementExistById(ele);
		else return super.elementExistByAccessibilityId(ele);
	}

	getElementsBy(ele) {
		if (ele.includes('//')) return super.getElementsByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.getElementsById(ele);
		else return super.getElementsByAccessibilityId(ele);
	}

	checkElementExistBy(ele) {
		if (ele.includes('//')) return super.checkElementExistByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.checkElementExistById(ele);
		else return super.checkElementExistByAccessibilityId(ele);
	}

	//move to methods

	moveToUp(ele) {
		if (ele.includes('//')) return super.moveToUpXpath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.moveToUpId(ele);
		else return super.moveToUpToAid(ele);
	}
	moveToDown(ele) {
		if (ele.includes('//')) return super.moveToDownXpath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.moveToDownId(ele);
		else return super.moveToDownToAid(ele);
	}

	// getElementSize
	getElementSize(ele) {
		if (ele.includes('//')) return super.getSizeByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.getSizeById(ele);
		else return super.getSizeByAccessibilityId(ele);
	}

	// getElementSize
	getElementLocation(ele) {
		if (ele.includes('//')) return super.getLocationByXPath(ele);
		else if (ele.includes('com.') || ele.includes(':id')) return super.getLocationById(ele);
		else return super.getLocationByAccessibilityId(ele);
	}
};
