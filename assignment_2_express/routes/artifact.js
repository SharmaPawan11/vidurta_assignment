const router = require("express").Router()
const { upsertArtifact } = require('../controllers')

router.post('/', upsertArtifact)

module.exports = router
