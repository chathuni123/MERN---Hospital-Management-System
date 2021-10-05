const express = require('express');
const router = express.Router();
const controller = require('../controllers/notices-controller');

module.exports = function () {
    router.post('/create', controller.createNotice);
    router.delete('/delete/:id',controller.deleteNotices);
    router.put('/edit/:id',controller.editNotices);
    router.get('/',controller.getallNotices);
    router.get('/get/:id',controller.getOneNotice);
    return router;
}