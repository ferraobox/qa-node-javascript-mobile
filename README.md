![JavaScript](https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript)
![Node](https://img.shields.io/badge/-NodeJs-000?&logo=node-dot-js)
![npm](https://img.shields.io/badge/-npm-000?&logo=npm)
![Appium](https://img.shields.io/badge/-Appium-violet?&?logoColor=violet)
![Android](https://img.shields.io/badge/-Android-000?&logo=Android)
![MacOs](https://img.shields.io/badge/-MacOs-000?&logo=MacOs)
![Jest](https://img.shields.io/badge/-jest-000?&logo=jest)
![eslint](https://img.shields.io/badge/-eslint-000?&logo=eslint)
![GitHubActions](https://img.shields.io/badge/-GitHubActions-000?&logo=github-actions)
![CodeClimate](https://img.shields.io/badge/-CodeClimate-000?&logo=code-climate)

### Latest - ![Release](https://img.shields.io/github/v/release/ferraobox/qa-node-javascript-mobile)

### CI result - [![CI - Test](https://github.com/ferraobox/qa-node-javascript-mobile/actions/workflows/release.yml/badge.svg)](https://github.com/ferraobox/qa-node-javascript-mobile/actions/workflows/release.yml)

### Code Climate - ![Code Climate coverage](https://img.shields.io/codeclimate/coverage/ferraobox/qa-node-javascript-mobile)

# QA NodeJs Javascript Mobile

### Prerequisites

Docker Desktop installed, Node 12 or higher and JDK with Android Platform tools.

#### Example for Android

This example is Oriented for Android Platform, but the good point is that you can use this framework for run the same code for Android or iOS platform

## Mobile testing project

You should do the following steps:

```
> npm i -g appium
```

You need to have de Android Studio and generate a Android 10 emulator, then run it and check that is avilable with command:

```
> adb devices
```

The command should return device conected:

```
List of devices attached
emulator-5554   device
```

The next step is open a new terminal and run the command:

```
appium -p 4723
```

After that On other Terminal into project path:

```
npm i
npm run test:app
```

The reports are located on reports folder into api project.

### Tech solution:

I've used appium and javascrip because is a useful, fast, and an easy way to develop android test without Android estudio environmnet since is an open source framework.
