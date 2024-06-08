const { Spell } = require("../../models");

exports.createSpell = async (req, res) => {
  try {
    const payload = await req.body;
    let exist = await Spell.findOne({
      "name": {
        $eq: payload.name
      }
    })

    if (exist) throw new Error('Spell with the provided name already exists')

    const created = await Spell.create(payload)

    if (!created) {
      return res.status(500).json({
        success: false,
        message: "Failed to create spell",
        data: {}
      })
    }

    res.status(201).json({
      success: true,
      data: {
        id: created.id
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}