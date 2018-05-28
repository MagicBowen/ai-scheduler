var args = process.argv.splice(2);

var chatBotDmIp = (args[0]) ? args[0] : "47.100.20.55"
var httpsPort = (args[1]) ? parseInt(args[1]) : 443

function getChatBotIp(){
	return chatBotDmIp
}

function getHttpsPort(){
	return httpsPort
}

module.exports = {
	getChatBotIp,
	getHttpsPort

}