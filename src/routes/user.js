const express = require('express')
const router = express.Router();


const {getAllUsers, getAllTestUsers, getAboutDipu} = require('../controllers/users')

router.route("/").get(getAllUsers);

router.route("/test").get(getAllTestUsers);
router.route("/dipu").get(getAboutDipu);


module.exports = router;