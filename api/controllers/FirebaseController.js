const axios = require('axios');
const https = require('https');
const { google } = require('googleapis');
var PROJECT_ID = 'ththth-36d88';
var HOST = 'https://fcm.googleapis.com';
var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
var SCOPES = [MESSAGING_SCOPE];

function getAccessToken() {
    return new Promise(function (resolve, reject) {
        var key = require('../../ththth-36d88-firebase-adminsdk-j4u63-0adb501bdd.json');
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        return jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return err;
            }
            resolve(tokens.access_token);
        });
    });
}

function buildCommonMessage() {
    return {
        'message': {
            'topic': 'th',
            'notification': {
                // 'title': 'FCM Notification',
                'image':'https://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
                'body': 'Notification from FCM',
            }
        }
    };
}

async function sendFCM(req, res) {
    let accessToken = await getAccessToken();
    console.log(accessToken);
    res.json({token: accessToken})
    
    // var options = {
    //     headers: {
    //         'Authorization': 'Bearer ' + accessToken
    //     }
    // };

    // axios.post(HOST + PATH, buildCommonMessage(), options)
    //     .then(function (response) {
    //         console.log('Message sent to Firebase for delivery, response:');
    //         console.log(response.data);
    //         response.data.status = 'success';
    //         res.json(response.data);
    //     });
    
}

function subscribeTopic(req, res) {
    console.log(req.body);
    
    // res.json(req);
    // let options = {
    //     url: API_URL_HTTP,
    //     method: 'post',
    //     headers: {
    //         'Authorization': 'key= ' + API_KEY
    //     },
    //     data: JSON.parse(data)
    // };
    // try {

    //     let response = await axios(options);
    //     return response.data
    // } catch (error) {
    //     return error;
    // }
}

module.exports.sendFCM = sendFCM;  
module.exports.subscribeTopic = subscribeTopic;  