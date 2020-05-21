const aws = require('aws-sdk');
const ses = new aws.SES({region: 'eu-west-1'});

exports.handler = (event, context, callback) => {
    const para = {
        //needs email from event. or manually e.g.: EmailAddress: "something@some.thing"
        EmailAddress: ""
    };

    //sends a verification link to email
    /*    ses.verifyEmailIdentity(para, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });*/

    //send email but if email is not verificated, does not send this message
    const params = {
        Destination: {
            //needs email from event. or manually e.g.: ToAddresses: ["something@some.thing"]
            ToAddresses: [""]
        },
        Message: {
            Body: {
                Text: { Data: "We are proud to present you with your AWeSome new identity! \n\n"
                        + "Name: " + event.name + " " + event.lastname + "\n"
                        + "Age: " + event.userAge + "\n"
                        + "Address: " + event.city + ", " + event.country + "\n"
                        + "email: " + event.email + "\n"
                        + "picture: " + event.pic + "\n"
                        + "Your favourite quote: \"" + event.value + "\"\n\n"
                        + "The Trollgenerator development team takes no responsibility for your new identity. \n"
                        + "Trolling must be done with extreme caution and all safety issues must be taken into consideration. \n\n"
                        + "We wish you happy accidents with your new identity!\n\n"
                        + "P.S. " + event.setup + "\n"
                        + "\t - " + event.punchline
                }
            },
            Subject: { Data: "Your new troll identity"
            }
        },
        //needs email from event. or manually e.g.: Source: "something@some.thing"
        Source: ""
    };

    ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            console.log(data);
            context.succeed(event);
        }
    });
};