const PageObjectAndroid = require('../../../controllers/PageObjectAndroid');

class BalanceListPO extends PageObjectAndroid {
  constructor() {
    super();
    //Start Cancel policy
    this.balance_amount = 'com.monefy.app.lite:id/balance_amount';
    this.balance_list = '//android.widget.ExpandableListView/android.widget.RelativeLayout';
    this.balance_item_name = '//android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]';
    this.balance_item_amount = '//android.widget.TextView';
  }

  /* #region  Common methods */
  elementDisplayedBy = (ele) => super.elementDisplayedBy(this[ele]);

  clickBy = (ele) => super.clickBy(this[ele]);

  fillTextBy = (ele, text) => super.fillTextBy(this[ele], text);

  getAttributeBy = (ele, att) => super.getAttributeBy(this[ele], att);

  elementExist = (ele) => super.elementExist(this[ele]);

  moveToUp = (ele) => super.moveToUp(this[ele]);

  moveToDown = (ele) => super.moveToDown(this[ele]);

  getElementsBy = (ele) => super.getElementsBy(this[ele]);

  /* #endregion */

  async getNameList() {
    const itemsList = await this.getElementsBy('balance_list');
    return Promise.all(itemsList.map((element) => element.elementByXPath(this.balance_item_name).getAttribute('text')));
  }

  async getAmountList() {
    const itemsList = await this.getElementsBy('balance_list');
    return Promise.all(itemsList.map((element) => element.elementByXPath(this.balance_item_amount).getAttribute('text')));
  }
}

module.exports = new BalanceListPO();
