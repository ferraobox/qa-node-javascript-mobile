const PageObjectApp = require('./PageObjectApp');
module.exports = class PageObjectAndroid extends PageObjectApp {
  constructor() {
    super();
  }

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

  elementExist(ele, css) {
    return super.exist(ele, css);
  }

  getElementsBy(ele) {
    if (ele.includes('//')) return super.getElementsByXPath(ele);
    else if (ele.includes('com.') || ele.includes(':id')) return super.getElementsById(ele);
    else return super.getElementsByAccessibilityId(ele);
  }

  //move to methods
  moveTo(ele, dir) {
    return super.moveTo(ele, dir);
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
