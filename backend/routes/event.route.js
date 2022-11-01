const express = require('express')
const router = express.Router();

const { getEvents, createEvent } = require('../controllers/event.controller');
const eventValidations = require('../validations/event.validation');
const fileUpload = require('../middlewares/file-upload');

router.get('/', getEvents);

router.post(
  '/',
  fileUpload.single('image'),
  eventValidations,
  createEvent
);

module.exports = router;