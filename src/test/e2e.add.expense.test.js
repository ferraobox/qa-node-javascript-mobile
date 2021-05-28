const runTest = require('../../helpers/setup').runTest;

runTest('Test - Add new expense', function () {
  test('App load correctly', async function () {
    expect(await DashboardPO.elementExist('piegraph')).toBeTruthy();
  });

  test('Click on New Expense', async function () {
    await DashboardPO.clickBy('expense_button');
    expect(await NewOperationPO.elementDisplayedBy('two_button')).toBeTruthy();
  });

  test('Mark 20.50', async function () {
    await NewOperationPO.clickBy('two_button');
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
    expect(expensed).toBe('£20.50');
  });
});
