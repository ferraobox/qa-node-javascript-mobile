const PageObjectAndroid = require('../../../controllers/PageObjectAndroid');

class NewOperationPO extends PageObjectAndroid {
	constructor() {
		super();
		//Start Cancel policy
		this.amount_text = 'com.monefy.app.lite:id/amount_text';
		this.date = 'com.monefy.app.lite:id/textViewDate';
		this.currency_name = 'com.monefy.app.lite:id/currency_name';
		this.button_clear = 'com.monefy.app.lite:id/buttonKeyboardClear';
		this.back = 'Navigate up';
		this.choose_category = 'com.monefy.app.lite:id/keyboard_action_button';
		//Keyboard:
		this.plus_button = 'com.monefy.app.lite:id/buttonKeyboardPlus';
		this.minus_button = 'com.monefy.app.lite:id/buttonKeyboardMinus';
		this.multiply_button = 'com.monefy.app.lite:id/buttonKeyboardMultiply';
		this.divide_button = 'com.monefy.app.lite:id/buttonKeyboardDivide';
		this.equals_button = 'com.monefy.app.lite:id/buttonKeyboardEquals';
		this.dot_button = 'com.monefy.app.lite:id/buttonKeyboardDot';
		this.one_button = 'com.monefy.app.lite:id/buttonKeyboard1';
		this.two_button = 'com.monefy.app.lite:id/buttonKeyboard2';
		this.three_button = 'com.monefy.app.lite:id/buttonKeyboard3';
		this.four_button = 'com.monefy.app.lite:id/buttonKeyboard4';
		this.five_button = 'com.monefy.app.lite:id/buttonKeyboard5';
		this.six_button = 'com.monefy.app.lite:id/buttonKeyboard6';
		this.seven_button = 'com.monefy.app.lite:id/buttonKeyboard7';
		this.eight_button = 'com.monefy.app.lite:id/buttonKeyboard8';
		this.nine_button = 'com.monefy.app.lite:id/buttonKeyboard9';
		this.cero_button = 'com.monefy.app.lite:id/buttonKeyboard0';
	}

	/* #region  Common methods */
	elementDisplayedBy = (ele) => super.elementDisplayedBy(this[ele]);

	clickBy = (ele) => super.clickBy(this[ele]);

	fillTextBy = (ele, text) => super.fillTextBy(this[ele], text);

	getAttributeBy = (ele, att) => super.getAttributeBy(this[ele], att);

	elementExistBy = (ele) => super.elementExistBy(this[ele]);

	moveToUp = (ele) => super.moveToUp(this[ele]);

	moveToDown = (ele) => super.moveToDown(this[ele]);

	getElementsBy = (ele) => super.getElementsBy(this[ele]);
	/* #endregion */

	clickOnCategory(category) {
		const category_selector = `//android.widget.TextView[@text="${category}"]`;
		return super.clickBy(category_selector);
	}
}

module.exports = new NewOperationPO();
