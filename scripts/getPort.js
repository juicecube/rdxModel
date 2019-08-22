const net = require('net');

module.exports = () => new Promise((resolve, reject) => {
	const server = net.createServer();
	server.unref();
	server.on('error', reject);
	server.listen(() => {
		const {port} = server.address();
		server.close(() => {
			resolve(port);
		});
	});
});