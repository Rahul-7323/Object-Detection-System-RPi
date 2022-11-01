const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  timestamp: { type: String, required: true },
  description: { type: String },
  level: { type: Number, required: true },
  objects: [{
    name: { type: String, required: true },
    prob: { type: Number, required: true },
  }],
  image: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);