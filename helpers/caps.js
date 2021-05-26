exports.Android10 = {
  automationName: 'UiAutomator2',
  platformName: 'Android',
  platformVersion: '10',
  deviceName: 'Android10',
  app: `${process.env.PWD}/app/com.monefy.apk`,
  browserName: '',
  clearSystemFiles: true,
  udid: 'emulator-5554',
  appPackage: 'com.monefy.app.lite',
  appWaitDuration: 60000,
  fullReset: true,
  language: 'EN',
  locale: 'EN',
  uiautomator2ServerLaunchTimeout: 60000,
  uiautomator2ServerInstallTimeout: 60000,
  androidInstallTimeout: 600000,
  remoteAppsCacheLimit: 0,
  newCommandTimeout: 450,
};
