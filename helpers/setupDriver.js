require('colors');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
//Set up driver
const wd = require('wd'),
  actions = require('./actions'),
  serverConfigs = require('./appium-servers');
//Add custom methos for components
wd.addPromiseChainMethod('elementExist', actions.elementExist);
wd.addPromiseChainMethod('getWebElement', actions.getWebElement);
wd.addPromiseChainMethod('addPhotosToDevice', actions.addPhotosToDevice);
wd.addPromiseChainMethod('clean', actions.clean);
wd.addPromiseChainMethod('pullToRefresh', actions.pullToRefresh);
wd.addPromiseChainMethod('screenShot', actions.screenShot);
wd.addPromiseChainMethod('compareScreenshots', actions.compareScreenshots);
wd.addPromiseChainMethod('cropImage', actions.cropImage);
wd.addPromiseChainMethod('elementOnWindow', actions.elementOnWindow);
wd.addPromiseChainMethod('hideKeyboardTouch', actions.hideKeyboardTouch);
wd.addPromiseChainMethod('clickSendKeyboard', actions.clickSendKeyboard);
wd.addPromiseChainMethod('moveToDown', actions.moveToDown);
wd.addPromiseChainMethod('moveToUp', actions.moveToUp);
wd.addPromiseChainMethod('swipeTo', actions.swipeTo);
wd.addPromiseChainMethod('movePickerElement', actions.movePickerElement);
wd.addPromiseChainMethod('pinch', actions.pinch);
wd.addPromiseChainMethod('tap', actions.tap);
wd.addPromiseChainMethod('signature', actions.signature);

//Set up asserts
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
// global.expect = chai.expect;
//Configure driver
const driver = wd.promiseChainRemote(serverConfigs[process.env.OS]);
if (process.env.DEBUG_CONSOLE === 'true') require('./logging').configure(driver);
module.exports = driver;
