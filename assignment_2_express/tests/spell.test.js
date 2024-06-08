const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { Spell } = require('../models/index')

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /spells", () => {
  describe("",  () => {
    const body = {
      name: "No Template",
      description: "A spell with no template used for testing purposes",
      effect: "Has no effect, infact you can't even apply it on artifact without a template"
    }

    it("should create a new spell when required fields are provided", async () => {
      const res = await request(app).post("/spells").send(body);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
    })

    afterEach(async () => {    
      await Spell.deleteOne({
        name: {
          $eq: body.name
        }
      })
    });
  });

  describe("",  () => {
    const body = {
      name: "No Template",
      description: "A spell with no template used for testing purposes",
      effect: "Has no effect, infact you can't even apply it on artifact without a template"
    }

    it("should throw error when multiple spells are created with same name", async () => {
      let res = await request(app).post("/spells").send(body);
      res = await request(app).post("/spells").send(body);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Spell with the provided name already exists');
    })

    afterEach(async () => {
      await Spell.deleteOne({
        name: {
          $eq: body.name
        }
      })
    });
  });
});