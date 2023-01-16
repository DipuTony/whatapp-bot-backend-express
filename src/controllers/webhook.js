const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: 'EAAIZBvM1yOr0BALbrjsSQedqqn6kiiZCGHL16hyZB1yLvYKHCYRfkNEiJ5ZA4ZAq8wOzoJCrzoefE22diBVr6RCoRqxHcVD1WNQOzW3II7rQlbZCabbTkjAM7GVC4g3YUXFPhl6qsII1N0CwZBn6OlkZBVbya12vBuY3ZBXJUmM7ZAdL44Plry8WdSeot42CtnFZAvkNiAdvxt2gwWa4vhecNfVZBPpy63aoHNAZD',
    senderPhoneNumberId: '103215889230412',
    WABA_ID: '102652519287870',
});

const getWebhook = (req, res) => {
    console.log('GET: Someone is pinging me!');

    if (
        req.query["hub.mode"] == "subscribe" &&
        req.query["hub.verify_token"] == "12345"
      ) {
        res.send(req.query["hub.challenge"]);
      } else {
        res.sendStatus(400);
      }
    // res.status(200).json({ msg: "GET : Webhook All projexys" })
}


const postWebhook = async (req, res) => {
    console.log('POST: Someone is pinging me!');
}

module.exports = { getWebhook, postWebhook };