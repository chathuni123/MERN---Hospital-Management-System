const express = require('express');
const router = express.Router();
const controller = require('../controllers/labreports-controller');

module.exports = function () {
    router.post('/create', controller.createLabreport);
    router.get('/',controller.getallLabreports);
    router.delete('/delete/:id',controller.deleteLabreport);
    router.get('/get/:id',controller.getLabreport);
    router.put('/edit/:id',controller.editLabreport);
    return router;
}