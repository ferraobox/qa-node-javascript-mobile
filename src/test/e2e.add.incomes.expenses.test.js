const makeTest = require('../../helpers/setup').makeTest;

makeTest('Test - Add new expense', function () {
	test('App load correctly', async function () {
		expect(await DashboardPO.elementExistBy('piegraph')).to.be.true;
	});

	test('Click on New Income', async function () {
		await DashboardPO.clickBy('income_button');
	});

	test('Mark 300', async function () {
		await NewOperationPO.clickBy('three_button');
		await NewOperationPO.clickBy('cero_button');
		await NewOperationPO.clickBy('cero_button');
	});

	test('Click on choose category', async function () {
		await NewOperationPO.clickBy('choose_category');
	});

	test('Click on "Salary" category', async function () {
		await NewOperationPO.clickOnCategory('Salary');
	});

	test('Dashboard is displayed', async function () {
		expect(await DashboardPO.elementExistBy('piegraph')).to.be.true;
	});

	test('Get total expensed', async function () {
		const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
		const income = await DashboardPO.getAttributeBy('income_amount_text', 'text');
		console.log(expensed, income);
		expect(expensed.includes('0.00'), 'Expense do not match').to.be.true;
		expect(income.includes('300.00'), 'Expense do not match').to.be.true;
	});

	test('Click on New Expense', async function () {
		await DashboardPO.clickBy('expense_button');
	});

	test('Mark 10.50', async function () {
		await NewOperationPO.clickBy('one_button');
		await NewOperationPO.clickBy('cero_button');
		await NewOperationPO.clickBy('dot_button');
		await NewOperationPO.clickBy('five_button');
		await NewOperationPO.clickBy('cero_button');
	});

	test('Click on choose category', async function () {
		await NewOperationPO.clickBy('choose_category');
	});

	test('Click on "Sports" category', async function () {
		await NewOperationPO.clickOnCategory('Sports');
	});

	test('Dashboard is displayed', async function () {
		expect(await DashboardPO.elementExistBy('piegraph')).to.be.true;
	});

	test('Get total expensed', async function () {
		const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
		console.log(expensed);
		expect(expensed.includes('10.50'), 'Expense do not match').to.be.true;
	});

	test('Click on New Expense', async function () {
		await DashboardPO.clickBy('expense_button');
	});

	test('Mark 10.50', async function () {
		await NewOperationPO.clickBy('one_button');
		await NewOperationPO.clickBy('cero_button');
		await NewOperationPO.clickBy('dot_button');
		await NewOperationPO.clickBy('five_button');
		await NewOperationPO.clickBy('cero_button');
	});

	test('Click on choose category', async function () {
		await NewOperationPO.clickBy('choose_category');
	});

	test('Click on "Bills" category', async function () {
		await NewOperationPO.clickOnCategory('Bills');
	});

	test('Dashboard is displayed', async function () {
		expect(await DashboardPO.elementExistBy('piegraph')).to.be.true;
	});

	test('Get total expensed', async function () {
		const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
		console.log(expensed);
		expect(expensed.includes('21.00'), 'Expense do not match').to.be.true;
	});

	test('Click on Balance button', async function () {
		await DashboardPO.clickBy('balance_amount');
		const settings = await RightMenuPO.getElementsBy('settings_imagebutton');
		if (settings.length > 0) await DashboardPO.clickBy('settings');
		expect(await BalanceListPO.elementExistBy('balance_list'), 'Balance list not displayed').to.be.true;
	});

	test('Check all amount of list', async function () {
		const names = await BalanceListPO.getNameList();
		expect(names.includes('Salary') && names.includes('Sports') && names.includes('Bills'), 'List not contains all elements').to.be.true;
	});
});
