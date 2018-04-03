request = require('request-json');

const agent = 'course-record';
const url = 'http://47.100.99.213';

function request(userId, query) {
    var data = { query : { query : '', confidence : 1.0 }, session : '', agent : agent };
    data.query.query = query;
    data.session = userId;

    var client = request.newClient(url);
    client.post('query', data, function(err, res, body) {
      console.log(res.statusCode, body);
    });
}
