const { Artifact, Spell } = require('./models/index')
require("dotenv").config();
const start = require('./index')

const seed = async () => {
  const artifacts = await Artifact.create([
    {
      name: "Amulet of Thoth",
      description: "Confers wisdom.",
      age: 1000,
      provenance: "Egypt"
    },
    {
      name: "The Spear of Destiny",
      description: "A spear said to have decided battles.",
      age: 300,
      provenance: "Europe"
    },
    {
      name: "The Arcane Grimoire",
      description: "Contains ancient spells.",
      age: 150,
      provenance: "Unknown"
    }
  ])

  const spells = await Spell.create([
    {
      "name": "Precision",
      "description": "Increases the historical accuracy of the age and provenance.",
      "effect": "If the age is unknown (null), it sets it to 100. If the provenance is \"Unknown\", it replaces it with \"Mysterious Origin\".",
      "template": "{{^age}}\"age\": 100{{/age}},{{^provenance}}\"provenance\": \"Mysterious Origin\"{{/provenance}}",
    },
    {
      "name": "Obscurity",
      "description": "Conceals the details of the artifact.",
      "effect": "Replaces description with \"Description lost in the shadows\"",
      "template": "\"description\": \"Description lost in the shadows\" ,\"obscured\": true ,\"originalDescription\": \"{{description}}\"",
    },
    {
      "name": "Truth",
      "description": "Reverses the effects of obscuration.",
      "effect": "Restores the original description if it has been obscured.",
      "template": "{{#obscured}}\"description\": \"{{originalDescription}}\"{{/obscured}},\"obscured\": false",
    },
    {
      "name": "Longevity",
      "description": "Doubles the age of the artifact.",
      "effect": "Multiplies the artifact's age by 2.",
      "template": "{{#age}}\"age\": {{age | multiply:2}}{{/age}}"
    },
    {
      "name": "Renewal",
      "description": "Resets the age and provenance of the artifact.",
      "effect": "Sets the age to 0 and provenance to \"Unknown\".",
      "template": "\"age\": 0, \"provenance\": \"Unknown\""
    },
    {
      "name": "Extension",
      "description": "Reveals and extends the powers of the artifact.",
      "effect": "Adds to the description \"Its powers are amplified\".",
      "template": "\"description\": \"{{description}} Its powers are amplified.\"",
    }
  ])
  if (spells && artifacts) {
    process.exit(0)
  }
}

seed()

