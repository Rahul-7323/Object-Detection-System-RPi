const { validationResult } = require('express-validator');
const HttpError = require('../utils/http-error');

const _Event = require('../models/event.model');

const getEvents = async (req, res, next) => {
  let events;

  try {
    events = await _Event.find();
  }
  catch (err) {
    const error = new HttpError('Unable to fetch the events', 500);
    return next(error);
  }

  if (!events || events.length === 0) {
    const error = new HttpError('Could not find any events', 404);
    return next(error);
  }

  res.json({ events: events.map(event => event.toObject({ getters: true })) });
};


const createEvent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid data provided', 422);
    return next(error);
  }

  const { timestamp, description, level } = req.body;

  const objects = JSON.parse(req.body.objects);

  const createdEvent = new _Event({
    timestamp,
    description,
    level,
    objects,
    image: req.file.path
  });

  try {
    await createdEvent.save();
  }
  catch (err) {
    const error = new HttpError('Unable to create a new event', 500);
    return next(error);
  }

  res.status(201).json({ event: createdEvent.toObject({ getters: true }) });
};

exports.getEvents = getEvents;
exports.createEvent = createEvent;