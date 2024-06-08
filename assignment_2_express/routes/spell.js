const router = require("express").Router()
const { createSpell } = require('../controllers')

router.post('/', createSpell)

module.exports = router
