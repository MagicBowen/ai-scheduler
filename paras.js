var args = process.argv.splice(2);

var chatBotDmIp = (args[0]) ? args[0] : "47.100.20.55"
var httpsPort = (args[1]) ? parseInt(args[1]) : 443
var agent = (args[2]) ? parseInt(args[2]) : "course-record"

function getChatBotIp(){
	return chatBotDmIp
}

function getHttpsPort(){
	return httpsPort
}

function getAgent(){
	return agent
}

module.exports = {
	getChatBotIp,
	getHttpsPort,
	getAgent
}