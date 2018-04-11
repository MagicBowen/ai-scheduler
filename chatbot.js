request = require('request-json');
var client = request.createClient('http://47.100.20.55');

const agent = 'course-record';

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

async function replyToText(userId, text) {
    var data = { query : { query : text, confidence : 1.0 }, session : userId, agent : agent };
    var response = await asyncPost(data)
    console.log(response);
    return response;  
}

async function replyToEvent(userId, eventType) {
    var data = { event : { name : eventType }, session : userId, agent : agent };
    var response = await asyncPost(data)
    return response;
}

module.exports={
    replyToText,
    replyToEvent
}