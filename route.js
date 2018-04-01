var express = require('express');
var router = express.Router();
const _ = require('lodash');
const messageBuilder=require('./message');


router.use('/', function(req, res, next) {
    const body=req.body;
    console.log(body);
    const query=_.get(body,"request.intent.query");//user says
    console.log(query);
    const requestType=_.get(body,"request.intent.request_type"); //Start,Intent,End
    var message;//reply
    if(requestType==="Start"){
        message=messageBuilder.buildResponseSimple("欢迎进入我的课表",false);
    }else{
        message=messageBuilder.buildResponse(["尉刚强同学，您还没有录入任何课程信息呢"],true);
    }
    console.log(message);
    res.json(message);
 });


module.exports = router;
