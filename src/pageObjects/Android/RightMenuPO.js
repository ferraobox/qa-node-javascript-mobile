const PageObjectAndroid = require('../../../controllers/PageObjectAndroid');

class RightMenuPO extends PageObjectAndroid {
  constructor() {
    super();
    //Start Cancel policy

    this.settings_imagebutton = 'com.monefy.app.lite:id/settings_imagebutton';
  }

  /* #region  Common methods */
  elementDisplayedBy = (ele) => super.elementDisplayedBy(this[ele]);

  clickBy = (ele) => super.clickBy(this[ele]);

  fillTextBy = (ele, text) => super.fillTextBy(this[ele], text);

  getAttributeBy = (ele, att) => super.getAttributeBy(this[ele], att);

  elementExist = (ele) => super.elementExist(this[ele]);

  moveTo = (ele) => super.moveTo(this[ele], dir);

  getElementsBy = (ele) => super.getElementsBy(this[ele]);

  /* #endregion */
}

module.exports = new RightMenuPO();
