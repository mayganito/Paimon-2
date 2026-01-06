//JotaroKujo0525 note, this is a deed that i should've done a long time ago
require('dotenv').config()

const DiscordMusicBot = require("./lib/DiscordMusicBot");

console.log("!!! SYSTEM STARTUP - DEBUG PROBE !!!");
console.log("Current Directory:", __dirname);
try {
	const fs = require('fs');
	console.log("Config file exists check:", fs.existsSync('./config.js'));
	console.log("Config file stats:", fs.statSync('./config.js').isDirectory() ? "DIRECTORY" : "FILE");
} catch (e) {
	console.log("Config file check error:", e.message);
}

const { exec } = require("child_process");

if (process.env.REPL_ID) {
	console.log("Replit system detected, initiating special `unhandledRejection` event listener.")
	process.on('unhandledRejection', (reason, promise) => {
		promise.catch((err) => {
			if (err.status === 429) {
				console.log("something went wrong whilst trying to connect to discord gateway, resetting...");
				exec("kill 1");
			}
		});
	});
}

const client = new DiscordMusicBot();

console.log("Make sure to fill in the config.js before starting the bot.");

const getClient = () => client;

module.exports = {
	getClient,
};
