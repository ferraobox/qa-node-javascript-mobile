require('colors');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
//Set up driver
const wd = require('wd'),
	actions = require('./actions'),
	serverConfigs = require('./appium-servers');
//Add custom methos for components
wd.addPromiseChainMethod('swipeTo', actions.swipeTo);
wd.addPromiseChainMethod('moveToDownXpath', actions.moveToDownXpath);
wd.addPromiseChainMethod('moveToUpXpath', actions.moveToUpXpath);
wd.addPromiseChainMethod('slideToRightXpath', actions.slideToRightXpath);
wd.addPromiseChainMethod('screenShot', actions.screenShot);
wd.addPromiseChainMethod('compareScreenshots', actions.compareScreenshots);
wd.addPromiseChainMethod('hideKeyboardTouch', actions.hideKeyboardTouch);
wd.addPromiseChainMethod('elementExistXpath', actions.elementExistXpath);
wd.addPromiseChainMethod('clickSendKeyboard', actions.clickSendKeyboard);
wd.addPromiseChainMethod('elementOnWindow', actions.elementOnWindow);
wd.addPromiseChainMethod('addPhotosToDevice', actions.addPhotosToDevice);
wd.addPromiseChainMethod('signature', actions.signature);
wd.addPromiseChainMethod('pullToRefresh', actions.pullToRefresh);
wd.addPromiseChainMethod('slideToLeftXpath', actions.slideToLeftXpath);
wd.addPromiseChainMethod('slideToXpath', actions.slideToXpath);
wd.addPromiseChainMethod('deleteapp', actions.deleteapp);
wd.addPromiseChainMethod('tabElementXpath', actions.tabElementXpath);
wd.addPromiseChainMethod('tabElementAccessibilityId', actions.tabElementAccessibilityId);
wd.addPromiseChainMethod('clean', actions.clean);
wd.addPromiseChainMethod('startRecordingScreen', actions.startRecordingScreen);
wd.addPromiseChainMethod('stopRecordingScreen', actions.stopRecordingScreen);
wd.addPromiseChainMethod('moveToDownAccessibilityId', actions.moveToDownAccessibilityId);
wd.addPromiseChainMethod('moveToUpAccessibilityId', actions.moveToUpAccessibilityId);
wd.addPromiseChainMethod('moveToDownCss', actions.moveToDownCss);
wd.addPromiseChainMethod('moveToUpCss', actions.moveToUpCss);
wd.addPromiseChainMethod('movePickerElement', actions.movePickerElement);

if (process.env.OS === 'iOS') {
	wd.addPromiseChainMethod('elementExistAccessibilityId', actions.elementExistAccessibilityId);
} else {
	wd.addPromiseChainMethod('tabElementId', actions.tabElementId);
	wd.addPromiseChainMethod('tapAddress', actions.tapAddress);
	wd.addPromiseChainMethod('moveToDownId', actions.moveToDownId);
	wd.addPromiseChainMethod('moveToUpId', actions.moveToUpId);
	wd.addPromiseChainMethod('elementExistId', actions.elementExistId);
}
//Set up asserts
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
global.expect = chai.expect;
//Configure driver
const driver = wd.promiseChainRemote(serverConfigs[process.env.OS]);
if (process.env.DEBUG_CONSOLE === 'true') require('./logging').configure(driver);
module.exports = driver;
