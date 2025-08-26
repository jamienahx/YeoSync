const express = require('express');
const router = express.Router();
const noticeController = require("../controllers/notice")



router.get('/:type', noticeController.fetchDraftByType);



module.exports = router;