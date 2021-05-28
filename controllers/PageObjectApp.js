module.exports = class PageObjectApp {
  constructor() {
    this.driver = driver;
  }

  // * Click element
  clickByAccessibilityId(ele) {
    return this.driver.waitForElementByAccessibilityId(ele, 20000, `${ele} is not clickable`).elementByAccessibilityId(ele).click();
  }

  clickById(ele) {
    return this.driver.waitForElementById(ele, 20000, `${ele} is not clickable`).elementById(ele).click();
  }

  clickByXPath(ele) {
    return this.driver.waitForElementByXPath(ele, 20000, `${ele} is not clickable`).elementByXPath(ele).click();
  }

  // * Element displayed
  elementDisplayedById(ele) {
    return this.driver.waitForElementById(ele, 20000, `${ele} is not displayed`).elementById(ele).isDisplayed();
  }

  elementDisplayedByAccessibilityId(ele) {
    return this.driver.waitForElementByAccessibilityId(ele, 20000, `${ele} is not displayed`).elementByAccessibilityId(ele).isDisplayed();
  }

  elementDisplayedByXPath(ele) {
    return this.driver.waitForElementByXPath(ele, 20000, `${ele} is not displayed`).elementByXPath(ele).isDisplayed();
  }

  // Move to down
  moveToDown(ele) {
    return this.driver.moveToDown(ele);
  }

  // Move to up
  moveToUp(ele) {
    return this.driver.moveToUp(ele);
  }

  moveToExecuteUP() {
    return this.driver.execute('mobile: scroll', { direction: 'up' });
  }
  moveToExecuteDown() {
    return this.driver.execute('mobile: scroll', { direction: 'down' });
  }

  // Get attribute
  getAttributeByXPath(ele, att) {
    return this.driver.waitForElementByXPath(ele, 10000).elementByXPath(ele).getAttribute(att);
  }

  getAttributeById(ele, att) {
    return this.driver.waitForElementById(ele, 20000).elementById(ele).getAttribute(att);
  }

  getAttributeByAccessibilityId(ele, att) {
    return this.driver.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).getAttribute(att);
  }

  // Fill text
  fillTextByAccessibilityId(ele, text) {
    return this.driver.waitForElementByAccessibilityId(ele, 20000).elementByAccessibilityId(ele).click().clean(ele).sendKeys(text).hideKeyboardTouch();
  }

  fillTextById(ele, text) {
    return this.driver.waitForElementById(ele, 40000).elementById(ele).click().clean(ele).sendKeys(text).hideKeyboardTouch();
  }

  async fillTextByXPath(ele, text) {
    await this.driver.waitForElementByXPath(ele, 10000).elementByXPath(ele).click().clean(ele).sendKeys(text);
    return this.driver.hideKeyboardTouch();
  }

  //Element Exist
  exist(ele, css) {
    return this.driver.elementExist(ele, css);
  }

  //Get elements
  getElementsByXPath(ele) {
    return this.driver.elementsByXPath(ele);
  }

  getElementsById(ele) {
    return this.driver.elementsById(ele);
  }

  getElementsByAccessibilityId(ele) {
    return this.driver.elementsByAccessibilityId(ele);
  }

  //Element get Size
  getSizeByXPath(ele) {
    return this.driver.elementByXPath(ele).getSize();
  }

  getSizeById(ele) {
    return this.driver.elementById(ele).getSize();
  }

  getSizeByAccessibilityId(ele) {
    return this.driver.elementByAccessibilityId(ele).getSize();
  }

  //Element get Location
  getLocationByXPath(ele) {
    return this.driver.elementByXPath(ele).getLocation();
  }

  getLocationById(ele) {
    return this.driver.elementById(ele).getLocation();
  }

  getLocationByAccessibilityId(ele) {
    return this.driver.elementByAccessibilityId(ele).getLocation();
  }
};
