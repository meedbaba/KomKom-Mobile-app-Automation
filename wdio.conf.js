export const config = {
    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],

    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Device',
        'appium:udid': '51091FDAS000C5',
        'appium:appPackage': 'com.komkom',
        'appium:appActivity': 'com.komkom.MainActivity',
        'appium:noReset': true,
        'appium:newCommandTimeout': 120
    }],

    logLevel: 'info',

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        timeout: 60000
    }
};