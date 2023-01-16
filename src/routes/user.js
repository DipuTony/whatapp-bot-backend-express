const express = require('express')
const router = express.Router();


const {getAllUsers, getAllTestUsers} = require('../controllers/users')

router.route("/").get(getAllUsers);

router.route("/test").get(getAllTestUsers);


module.exports = router;