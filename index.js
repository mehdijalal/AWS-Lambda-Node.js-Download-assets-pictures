const AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    var key;
    if(event.uploadKey && event.uploadKey!=="") {
        key = event.uploadKey
    } else if(event.queryStringParameters.uploadKey && event.queryStringParameters.uploadKey!="") {
        key = event.queryStringParameters.uploadKey;
    }
    
    console.log("The Key: " + key);
    
    var params = {
        "Bucket": "butterball-asset-pics",
        "Key": key 
    };
    
    s3.getObject(params, function(err, data){
       if(err) {
           console.log("ERROR: " + err);
           callback(err, null);
       } else {
           console.log("GOT HERE");
           console.log("----- Data PIC: \n" + JSON.stringify(data, null, 2));
           let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
    }
    });
    

};

