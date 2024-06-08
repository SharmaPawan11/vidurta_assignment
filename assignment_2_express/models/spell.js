const mongoose = require("mongoose");

const SpellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },  
  effect: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: false
  }
});

const Spell = mongoose.model("Spell", SpellSchema);

module.exports = { Spell };