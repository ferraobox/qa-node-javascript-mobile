const runTest = require('../../helpers/setup').runTest;

runTest('Test - Add new expense', function () {
  test('App load correctly', async function () {
    expect(await DashboardPO.elementExist('piegraph')).toBeTruthy();
  });

  test('Click on New Expense', async function () {
    await DashboardPO.clickBy('expense_button');
    expect(await NewOperationPO.elementDisplayedBy('one_button')).toBeTruthy();
  });

  test('Mark 10.50', async function () {
    await NewOperationPO.clickBy('one_button');
    await NewOperationPO.clickBy('cero_button');
    await NewOperationPO.clickBy('dot_button');
    await NewOperationPO.clickBy('five_button');
    await NewOperationPO.clickBy('cero_button');
    expect(await NewOperationPO.elementDisplayedBy('choose_category')).toBeTruthy();
  });

  test('Click on choose category', async function () {
    await NewOperationPO.clickBy('choose_category');
    expect(await NewOperationPO.categoryDisplayed('Bills')).toBeTruthy();
  });

  test('Click on "Bills" category - Dashboard is displayed', async function () {
    await NewOperationPO.clickOnCategory('Bills');
    expect(await DashboardPO.elementExist('piegraph')).toBeTruthy();
  });

  test('Get total expensed', async function () {
    const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
    expect(expensed.includes('10.50')).toBeTruthy();
  });

  test('Click on New Expense', async function () {
    await DashboardPO.clickBy('expense_button');
    expect(await NewOperationPO.elementExist('one_button')).toBeTruthy();
  });

  test('Mark 10.50', async function () {
    await NewOperationPO.clickBy('one_button');
    await NewOperationPO.clickBy('cero_button');
    await NewOperationPO.clickBy('dot_button');
    await NewOperationPO.clickBy('five_button');
    await NewOperationPO.clickBy('cero_button');
    expect(await NewOperationPO.elementExist('choose_category')).toBeTruthy();
  });

  test('Click on choose category', async function () {
    await NewOperationPO.clickBy('choose_category');
    expect(await NewOperationPO.categoryDisplayed('Sports')).toBeTruthy();
  });

  test('Click on "Sports" category - Dashboard is displayed', async function () {
    await NewOperationPO.clickOnCategory('Sports');
    expect(await DashboardPO.elementExist('piegraph')).toBeTruthy();
  });

  test('Get total expensed', async function () {
    const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
    expect(expensed.includes('21.00')).toBeTruthy();
  });

  test('Click on New Income', async function () {
    await DashboardPO.clickBy('income_button');
    expect(await NewOperationPO.elementExist('three_button')).toBeTruthy();
  });

  test('Mark 300', async function () {
    await NewOperationPO.clickBy('three_button');
    await NewOperationPO.clickBy('cero_button');
    await NewOperationPO.clickBy('cero_button');
    expect(await NewOperationPO.elementExist('choose_category')).toBeTruthy();
  });

  test('Click on choose category', async function () {
    await NewOperationPO.clickBy('choose_category');
    expect(await NewOperationPO.categoryDisplayed('Salary')).toBeTruthy();
  });

  test('Click on "Salary" category - Dashboard is displayed', async function () {
    await NewOperationPO.clickOnCategory('Salary');
    expect(await DashboardPO.elementExist('piegraph')).toBeTruthy();
  });

  test('Get total expensed', async function () {
    const expensed = await DashboardPO.getAttributeBy('expense_amount_text', 'text');
    const income = await DashboardPO.getAttributeBy('income_amount_text', 'text');
    expect(expensed.includes('21.00')).toBeTruthy();
    expect(income.includes('300.00')).toBeTruthy();
  });

  test('Click on Balance button', async function () {
    await DashboardPO.clickBy('balance_amount');
    const settings = await RightMenuPO.getElementsBy('settings_imagebutton');
    if (settings.length > 0) await DashboardPO.clickBy('settings');
    expect(await BalanceListPO.elementExist('balance_list')).toBeTruthy();
  });

  test('Check all amount of list', async function () {
    const names = await BalanceListPO.getNameList();
    expect(names.includes('Salary') && names.includes('Sports') && names.includes('Bills')).toBeTruthy();
  });
});
