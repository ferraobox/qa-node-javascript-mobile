const resemble = require('node-resemble-js');
module.exports = function(backgroundBefore, backgroundAfter) {
	return new Promise(resolve => {
		resemble(backgroundBefore)
			.compareTo(backgroundAfter)
			.ignoreColors()
			.onComplete(data => {
				resolve(data);
			});
	});
};
