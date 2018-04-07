var express = require('express');
var router = express.Router();
const _ = require('lodash');
const messageBuilder=require('./message');
const chatbot = require('./chatbot')


router.use('/', async function(req, res, next) {
    const body=req.body;
    console.log(body);

    const userId = _.get(body,"session.user.user_id")
    const query=_.get(body,"query");
    const requestType = _.get(body,"request.type");
    const noResponse = _.get(body,"request.no_response");
    const directWakeup = _.get(body,"request.intent.is_direct_wakeup");

    var message;
    if(noResponse){
        var response = await chatbot.replyToEvent(userId, 'no-response');
        console.log("receive no-response event\n")
        message=messageBuilder.buildResponseSimple(response, false);

    } else {
        if(requestType===0){
            var response;
            if(directWakeup && query)
            {
                console.log("receive query :==>" + query )
                response = await chatbot.replyToText(userId, query);
            } else {

                console.log("receive open-app event")
                response = await chatbot.replyToEvent(userId, 'open-app');
            }
            message=messageBuilder.buildResponseSimple(response, false);
        } else if(requestType===2){
            console.log("receive close-app event")
            var response = await chatbot.replyToEvent(userId, 'close-app');
            message=messageBuilder.buildResponseSimple(response, true);
        } else{
            console.log("receive other request " + requestType + "query is: ==>" + query)
            var response = await chatbot.replyToText(userId, query);
            console.log("receive response is: " + response )

            if(response.indexOf("我离开了") != -1){
                message=messageBuilder.buildResponseSimple(response, true);    
            }
            else {
                message=messageBuilder.buildResponseSimple(response, false);    
            }
        }
    }

    console.log(message);
    res.json(message);
 });


module.exports = router;
