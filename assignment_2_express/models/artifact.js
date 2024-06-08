const mongoose = require("mongoose");

const ArtifactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  provenance: {
    type: String,
    required: false,
  },
  spells: {
    type: Array,
    required: false
  }
});
  
const Artifact = mongoose.model("Artifact", ArtifactSchema);

module.exports = { Artifact };