const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
  accessToken: 'EAAIZBvM1yOr0BALbrjsSQedqqn6kiiZCGHL16hyZB1yLvYKHCYRfkNEiJ5ZA4ZAq8wOzoJCrzoefE22diBVr6RCoRqxHcVD1WNQOzW3II7rEAAGOZBKXSVnoBAIhedKUg3ZB8WNkOaHp9ay94iWBVuCAmZCpGK1bwEf9D9KhVpZBjuXU7ZABbrxqLGoqSQCM4jc5LZBVPBQbPiTdm6CXG2IKvpjUjFYJqbd610NOiZCtWocHIgrgabokSFfYYwxl1MQNUl9qZB4vnRpMV6ZACr53S1txlZBJ1H1iZBjUf2Sc74qo4ff3iV7H7GfUZB4CmHnOm3ZCPsj8zNFDDLJcZDQlbZCabbTkjAM7GVC4g3YUXFPhl6qsII1N0CwZBn6OlkZBVbya12vBuY3ZBXJUmM7ZAdL44Plry8WdSeot42CtnFZAvkNiAdvxt2gwWa4vhecNfVZBPpy63aoHNAZD',
  senderPhoneNumberId: '106160652257941',
  WABA_ID: '101981406018096',
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
}


const postWebhook = async (req, res) => {
  console.log('POST: Someone is pinging me!');

  try {
    let data = Whatsapp.parseMessage(req.body);

    if (data?.isMessage) {
      let incomingMessage = data.message;
      let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
      let recipientName = incomingMessage.from.name;
      let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
      let message_id = incomingMessage.message_id; // extract the message id



      //Message Initiate Here
      if (typeOfMsg === 'text_message') {


        //================= > Insert Start
        // let myData = {
        //   name: recipientName,
        //   phone: recipientPhone,
        //   message: incomingMessage.text.body,
        //   type: typeOfMsg,
        //   timestamp: incomingMessage.timestamp
        // }

        // console.log("This Need to Capture", myData)


        // let mydata = new WpModal(myData);
        // mydata.save()
        //   .then(doc => {
        //     console.log("data inserted", doc)
        //   })
        //   .catch(err => console.log("Error in data inserted", err))

        //============= Insert End

        await Whatsapp.sendSimpleButtons({
          message: `Hey ${recipientName}, \nYou are speaking to a chatbot.\nChoose a Service?`,
          recipientPhone: recipientPhone,
          listOfButtons: [
            {
              title: 'Water',
              id: 'water',
            },
            {
              title: 'Prperty',
              id: 'property',
            },
            {
              title: 'Trade',
              id: 'trade',
            },
          ],
        });
      }
      //Message Initiate END Here

      // Button Start Here
      if (typeOfMsg === 'simple_button_message') {
        let button_id = incomingMessage.button_reply.id;

        if (button_id === 'start_again') {
          await Whatsapp.sendSimpleButtons({
            message: `Hey ${recipientName}, Start Again. \nYou are speaking to a chatbot.\nChoose a Service?`,
            recipientPhone: recipientPhone,
            listOfButtons: [
              {
                title: 'Water',
                id: 'water',
              },
              {
                title: 'Prperty',
                id: 'property',
              },
              {
                title: 'Trade',
                id: 'trade',
              },
            ],
          });

        }

        if (button_id === 'speak_to_support_team') {
          await Whatsapp.sendText({
            recipientPhone: recipientPhone,
            message: `Wait, chatbots are super fast⚡, we never sleep, never rest, never take lunch 🍽.\n\nAnway Here is 📞contact details.\n\nWanna blast☎ his/her phone😈?\n`,
          });

          await Whatsapp.sendContact({
            recipientPhone: recipientPhone,
            contact_profile: {
              addresses: [
                {
                  city: 'Ranchi',
                  country: 'India',
                },
              ],
              name: {
                first_name: 'Dipu',
                last_name: 'Singh',
              },
              org: {
                company: 'Aadrika Enterprises',
              },
              phones: [
                {
                  phone: '+919708846652',
                },
                // {
                //     phone: '+254 712345678',
                // },
              ],
            },
          });
        }


        if (button_id === 'water') {

          let listOfWater = [
            {
              "title": "Water Service List",
              "rows": [
                {
                  "id": "total_water_application",
                  "title": "Total Water Application",
                  "description": "Test Text",
                },
                {
                  "id": "water_application_status",
                  "title": "Water Application Status",
                  "description": "Test Text",
                },
                {
                  "id": "water_renual",
                  "title": "Water Renual Charges",
                  "description": "Test Text",
                }
              ]
            }
          ]

          await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `# Water Service List `,
            bodyText: `\n\nPlease select Waster Service`,
            footerText: 'Powered by: Dipu Testing',
            listOfSections: listOfWater
          });
        }

        if (button_id === 'property') {
          // respond with a list of human resources
          await Whatsapp.sendText({
            recipientPhone: recipientPhone,
            message: `Which Service do You need.\n\n 1. SAF related. \n2. Property Related.`,
          });
        }
      }
      // Simple Button END Here

      // Radio Buton Start Here
      if (typeOfMsg === 'radio_button_message') {
        let selectionId = incomingMessage.list_reply.id;

        // if (selectionId === ('water_application_status')) {
        //     await Whatsapp.sendText({
        //         recipientPhone: recipientPhone,
        //         message: `Here is List of Your Applications`,
        //     });
        // }

        if (selectionId === ('total_water_application')) {

          const mobileNo = recipientPhone.slice(2);

          let response = await axios.post('http://192.168.0.16:8000/api/water-connection', { "mobileNo": mobileNo });
          let data = response.data;
          let appNo = data.map(item => item.application_no + '\n').join('');
          // let ward = data.map(user => user.ward_id);

          await Whatsapp.sendText({
            recipientPhone: recipientPhone,
            message: `Total No of Water Connections : ${data.length} \nHere is List :-\n\n${appNo}`,
          });


        }

        if (selectionId === ('water_application_status')) {

          await Whatsapp.sendText({
            recipientPhone: recipientPhone,
            message: `Here is List of Your Applications`,
          });

          let listOfWaterApplications = [
            {
              "title": "Water Service List",
              "rows": [
                {
                  "id": "waterApplication1",
                  "title": "Water APP : 23482384",
                  "description": "Choose to Know More",
                },
                {
                  "id": "waterApplication2",
                  "title": "Water APP : 72342379",
                  "description": "Choose to Know More",
                }
              ]
            }
          ]

          await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: `Your Water Application Lists `,
            bodyText: `\n\nPlease select a application`,
            footerText: 'Powered by: Dipu Testing',
            listOfSections: listOfWaterApplications
          });
        }

        if (selectionId === ('waterApplication1')) {
          await Whatsapp.sendText({
            recipientPhone: recipientPhone,
            message: `Your Application is in Processing.`,
          });

          await Whatsapp.sendImage({
            recipientPhone,
            url: 'https://cdn-icons-png.flaticon.com/512/2279/2279398.png',
            caption: "Thank You",
          });
          await Whatsapp.sendSimpleButtons({
            message: `What do you want to do next?`,
            recipientPhone: recipientPhone,
            message_id,
            listOfButtons: [
              {
                title: 'Speak Support Team',
                id: 'speak_to_support_team',
              },
              {
                title: 'Start Again',
                id: 'start_again',
              },
            ],
          });
        }

      }
      // Radio Buton END Here


      await Whatsapp.markMessageAsRead({
        message_id,
      });

    }
    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }

}

module.exports = { getWebhook, postWebhook };