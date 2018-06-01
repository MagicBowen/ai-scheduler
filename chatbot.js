request = require('request-json');
args = require("./paras")

var client = request.createClient('http://' + args.getChatBotIp());

console.log("connect to chatbot dm client:" + args.getChatBotIp())
const agent = args.getAgent();
console.log("start agent name:" + agent)

function concatReplies(replies) {
    var result = '';
    for(var i = 0; i < replies.length; i++) {
        result += replies[i];
    }
    return result;
}

function asyncPost(data) {
    return new Promise(function (resolve, reject) {
        client.post('query', data, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(concatReplies(body.reply));
        } else {
          reject(error);
        }
      });
    });
  }

async function replyToText(userId, text, userContext) {
    var data = { query : { query : text, confidence : 1.0 }, session : userId, agent : agent, userContext:userContext };
    var response = await asyncPost(data)
    console.log(response);
    return response;  
}

async function replyToEvent(userId, eventType,userContext) {
    var data = { event : { name : eventType }, session : userId, agent : agent, userContext:userContext };
    var response = await asyncPost(data)
    return response;
}

module.exports={
    replyToText,
    replyToEvent
}