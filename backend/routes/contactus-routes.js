const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactus-controller');

module.exports = function () {
    router.post('/create', controller.createContact);
    router.get('/',controller.getallcontacts);

    return router;
}