require('colors');
const fs = require('fs');
const updateLinterJson = () => {
	let linter = require(`${process.env.PWD}/.eslintrc.json`);
	linter = deletePOs(linter);
	let pageObjects = getPageObjects();
	pageObjects = pageObjects.flat().flat();
	pageObjects = pageObjects.filter((po, index) => pageObjects.indexOf(po) === index);

	let pageObjectsCount = 0;
	pageObjects.forEach((po) => {
		linter.globals[po] = true;
		pageObjectsCount++;
	});

	console.log('*** Linter Updated!!! Page object added:'.yellow, pageObjectsCount);
	return fs.writeFileSync('.eslintrc.json', JSON.stringify(linter), 'utf8');
};

function deletePOs(linter) {
	const globals = linter.globals;
	for (const key in globals) {
		if (globals.hasOwnProperty(key)) {
			if (checkIsPO(key)) delete linter.globals[key];
		}
	}
	return linter;
}

function checkIsPO(key) {
	const stringLength = key.length;
	let isPO = false;
	let ext = '';
	ext += key.charAt(stringLength - 2);
	ext += key.charAt(stringLength - 1);
	if (ext === 'PO') isPO = true;
	return isPO;
}

function getPageObjects(_path) {
	const basePath = `${process.env.PWD}/src/pageObjects`;
	const path = _path || basePath;

	return fs.readdirSync(path).map((f) => {
		const isFile = fs.lstatSync(`${path}/${f}`).isDirectory();
		if (isFile === true) {
			return getPageObjects(`${path}/${f}`);
		} else return f.split('.')[0];
	});
}

updateLinterJson();
