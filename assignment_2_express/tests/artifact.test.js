const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { Artifact } = require('../models/index')

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /artifacts", () => {
  describe("",  () => {
    const body = {
      "artifact": { "name": "Test Amulet", "description": "Amulet created to be used in test cases", "provenance": "Test" },
      "spells": ["Precision", "Obscurity", "Truth", "Longevity", "Renewal", "Extension"]
    }

    it("should create a new artifact and return artifact with applied spells", async () => {
      const res = await request(app).post("/artifacts").send(body);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('artifact');
    })

    afterEach(async () => {
      await Artifact.deleteOne({
        name: {
          $eq: body.artifact.name
        }
      })
    });
  });

  describe("",  () => {

    it("should influence Amulet of Thoth correctly when spell applied", async () => {
      const body = {
        artifact: {
          name: "Amulet of Thoth",
          description: "Confers wisdom.",
          provenance: "Egypt",
          age: 1000
        },
        spells: ["Precision", "Longevity", "Extension"]
      }

      let res = await request(app).post("/artifacts").send(body);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.artifact.name).toBe('Amulet of Thoth');
      expect(res.body.data.artifact.description).toBe('Confers wisdom. Its powers are amplified.');
      expect(res.body.data.artifact.age).toBe(2000);
      expect(res.body.data.artifact.provenance).toBe('Egypt');
    })

    it("should influence The Spear of Destiny correctly when spell applied", async () => {
      const body = {
        artifact: {
          name: "The Spear of Destiny",
          description: "A spear said to have decided battles.",
          provenance: "Europe",
          age: 300
        },
        spells: ["Obscurity", "Renewal"]
      }

      let res = await request(app).post("/artifacts").send(body);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.artifact.name).toBe('The Spear of Destiny');
      expect(res.body.data.artifact.description).toBe('Description lost in the shadows');
      expect(res.body.data.artifact.age).toBe(0);
      expect(res.body.data.artifact.provenance).toBe('Unknown');
    })

    it("should influence The Arcane Grimoire correctly when spell applied", async () => {
      const body = {
        artifact: {
          name: "The Arcane Grimoire",
          description: "Contains ancient spells.",
          provenance: "Unknown",
          age: 150
        },
        spells: ["Extension", "Truth", "Precision"]
      }

      let res = await request(app).post("/artifacts").send(body);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.artifact.name).toBe('The Arcane Grimoire');
      expect(res.body.data.artifact.description).toBe('Contains ancient spells. Its powers are amplified.');
      expect(res.body.data.artifact.age).toBe(150);
      expect(res.body.data.artifact.provenance).toBe('Mysterious Origin');
    })
  });
});