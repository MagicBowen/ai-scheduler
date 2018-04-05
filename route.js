var express = require('express');
var router = express.Router();
const _ = require('lodash');
const messageBuilder=require('./message');
const chatbot = require('./chatbot')


router.use('/', async function(req, res, next) {
    const body=req.body;
    console.log(body);

    const userId = _.get(body,"request.intent.session.user.user_id")
    console.log(userId);
    const query=_.get(body,"request.intent.query");
    console.log(query);
    const requestType = _.get(body,"request.intent.request_type");
    console.log(requestType);

    var message;
    if(requestType==="Start"){
        console.log("Start");
        var response = await chatbot.replyToEvent(userId, 'open-app');
        message=messageBuilder.buildResponseSimple(response, false);
    } else if(requestType==="End"){
        var response = await chatbot.replyToEvent(userId, 'close-app');
        message=messageBuilder.buildResponseSimple(response, false);
    } else{
        var response = await chatbot.replyToText(userId, query);
        message=messageBuilder.buildResponse([response],true);
    }

    console.log(message);
    res.json(message);
 });


module.exports = router;
