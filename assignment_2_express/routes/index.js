const express = require("express")
const spellRouter = require('./spell')
const artifactRouter = require('./artifact')

const router = express.Router()

router.use('/spells', spellRouter)
router.use('/artifacts', artifactRouter)

module.exports = router

