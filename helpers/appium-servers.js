exports.iOS = {
	host: 'localhost',
	port: 4725,
};

exports.Android = {
	host: 'localhost',
	port: 4723,
};

exports.sauce = {
	host: 'ondemand.saucelabs.com',
	port: 80,
	auth: process.env.npm_package_config_username + ':' + process.env.npm_package_config_key,
};
