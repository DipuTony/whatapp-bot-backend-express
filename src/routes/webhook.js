const express = require('express')
const router = express.Router();

const {getWebhook, postWebhook} = require('../controllers/webhook')

router.route("/webhook").get(getWebhook);
router.route("/webhook").post(postWebhook);


module.exports = router;