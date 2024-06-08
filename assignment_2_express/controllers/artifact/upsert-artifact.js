const { Artifact } = require("../../models/artifact");
const { Spell } = require("../../models/spell");
const Mustache = require('mustache');
const Wax = require('@jvitela/mustache-wax');

Wax(Mustache);
Mustache.Formatters = { 
  multiply: function (value, multiplier) {
    return value * multiplier;
  }
};

function transformArtifactForMustache(artifact) {
  return {
    ...artifact,
    provenance: artifact.provenance === 'Unknown' ? null : artifact.provenance
  }
}

function applySpells(spellTemplates, artifact) {
  spellTemplates.forEach((template) => {
    let patch = Mustache.render(template, artifact)
    patch = patch.replace(/(^,)|(,$)/g, "")
    patch = JSON.parse(`{${patch}}`)
    artifact = { ...artifact, ...patch }
  })
  return {
    name: artifact.name,
    description: artifact.description,
    age: artifact.age,
    provenance: artifact.provenance
  }
}

exports.upsertArtifact = async (req, res) => {
  try {
    const payload = await req.body
    let artifact = payload.artifact

    const spellNames = payload.spells
    let spells = await Spell.find({
      "name": {
        $in: spellNames
      },      
    })

    spells.sort((a, b) => spellNames.findIndex(name => a.name === name) - spellNames.findIndex(name => b.name === name ))
    
    const spellTemplates = []
    let spellIds = []

    if (spells.length !== spellNames.length) {
      throw new Error('Invalid Spell Name. Please check if the provided spells exist')
    }

    spells.forEach((spell) => {
      if (!spell.template) {
        throw new Error(`No Template available for ${spell.name} spell. Please ensure that template exists for provided spells`)
      }
      spellTemplates.push(spell.template)
      spellIds.push(spell.id)
    })

    // const exists = await Artifact.findOne({
    //   "name": {
    //     $eq: artifact.name
    //   }
    // })
    // if (exists) artifact = exists

    await Artifact.validate(artifact);
    await Artifact.findOneAndUpdate(
      { name: artifact.name }, {$set: {...artifact, spells: [...spellIds] }}, { upsert: true, runValidators: true, new: true }
    )

    artifact = applySpells(spellTemplates, transformArtifactForMustache({
      name: artifact.name,
      description: artifact.description,
      age: artifact.age,
      provenance: artifact.provenance
    }))

    return res.status(201).json({
      success: true,
      data: {
        artifact
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}