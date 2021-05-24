require('dotenv').config({ path: `${process.env.PWD}/env/.env` });
//Make test hooks are executed before and after of each test, for hooks before the execution, you should go to mocha.prepare
const makeTest = function (desc, cb) {
	describe(desc, () => {
		beforeAll(function () {
			//Setup Driver
			const _driver = require('./setupDriver');
			//Desired capabilities
			const desired = require('./caps')[process.env.DEVICE];
			try {
				//SetUp page Objects, data environment and driver
				let pageObjects = getPageObjects();
				pageObjects = pageObjects.flat();
				pageObjects.forEach((po) => {
					global[po.file] = require(`${po.path}`);
				});
				global.driver = _driver;
			} catch (err) {
				throw new Error(err);
			}
			return driver
				.init(desired)
				.setImplicitWaitTimeout(10000)
				.catch((err) => {
					throw new Error(err);
				});
		});

		afterAll(function () {
			return driver.quit().catch((err) => {
				console.log(err);
				console.log('* Session finished'.red);
			});
		});

		cb();
	});
};

function getPageObjects(_path) {
	const fs = require('fs');
	const basePath = `${process.env.PWD}/src/pageObjects/${process.env.OS}`;
	const path = _path || basePath;

	return fs.readdirSync(path).map((f) => {
		const isFile = fs.lstatSync(`${path}/${f}`).isDirectory();
		if (isFile === true) {
			return getPageObjects(`${path}/${f}`);
		}
		return {
			path: `${path}/${f}`,
			file: f.split('.')[0],
		};
	});
}

exports.makeTest = makeTest;
