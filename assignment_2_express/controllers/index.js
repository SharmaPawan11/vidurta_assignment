const { upsertArtifact } = require('./artifact/upsert-artifact')
const { createSpell } = require('./spell/create-spell')

module.exports = {
  createSpell,
  upsertArtifact
}