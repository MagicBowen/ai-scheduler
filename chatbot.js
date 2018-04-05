request = require('request-json');
var client = request.createClient('http://47.100.99.213:6060');

const agent = 'course-record';

function asyncPost(data) {
    return new Promise(function (resolve, reject) {
        client.post('query', data, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body.reply[0]);
        } else {
          reject(error);
        }
      });
    });
  }

async function replyToText(userId, text) {
    var data = { query : { query : text, confidence : 1.0 }, session : userId, agent : agent };
    var response = await asyncPost(data)
    console.log('Text: ' + JSON.stringify(response));  
}

async function replyToEvent(userId, eventType) {
    var data = { event : { name : eventType }, session : userId, agent : agent };
    var response = await asyncPost(data)
    console.log('Event: ' + JSON.stringify(response));
}

module.exports={
    replyToText,
    replyToEvent
}