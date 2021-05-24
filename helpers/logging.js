require('colors');
exports.configure = function (driver) {
	// See whats going on
	driver.on('status', function (info) {
		console.log(info.cyan);
	});
	driver.on('command', function (meth, path) {
		//for more informaton (meth, path, data)
		console.log(' > ' + meth.yellow, path.grey, '');
	});
	driver.on('http', function (meth, path) {
		//for more informaton (meth, path, data)
		console.log(' > ' + meth.magenta, path, ''.grey);
	});
};
