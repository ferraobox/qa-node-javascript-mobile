const PageObjectAndroid = require('../../../controllers/PageObjectAndroid');

class DashboardPO extends PageObjectAndroid {
	constructor() {
		super();
		//Start Cancel policy
		this.piegraph = 'com.monefy.app.lite:id/piegraph';
		this.expense_button = 'com.monefy.app.lite:id/expense_button_title';
		this.income_button = 'com.monefy.app.lite:id/income_button_title';
		this.balance_amount = 'com.monefy.app.lite:id/balance_amount';
		this.show_records = 'com.monefy.app.lite:id/rightLinesImageView';
		this.settings = 'com.monefy.app.lite:id/overflow';
		this.transfer_menu = 'com.monefy.app.lite:id/transfer_menu_item';
		this.search_records = 'com.monefy.app.lite:id/menu_search';
		this.open_navigation = 'Open navigation';
		this.expense_amount_text = 'com.monefy.app.lite:id/expense_amount_text';
		this.income_amount_text = 'com.monefy.app.lite:id/income_amount_text';
		//Expenses:
		this.expense_food = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[1]';
		this.expense_car = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[2]';
		this.expense_transport = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[3]';
		this.expense_entertaiment = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[4]';
		this.expense_house = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[5]';
		this.expense_taxi = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[6]';
		this.expense_eating_out = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[7]';
		this.expense_clothes = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[8]';
		this.expense_toiletry = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[9]';
		this.expense_sports = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[10]';
		this.expense_health = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[11]';
		this.expense_communications = '//android.widget.FrameLayout[@resource-id="com.monefy.app.lite:id/piegraph"]/android.widget.ImageView[12]';
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
}

module.exports = new DashboardPO();
