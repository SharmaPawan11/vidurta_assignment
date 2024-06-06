import {describe, expect, test} from '@jest/globals';
import util from 'util'
import { patientData, serialize, deserialize } from "./data_formatting";

describe("Serialization", () => {
  test("should serialize patient data", () => {
    expect(serialize([{
        patientId: "PI-31415",
        visitDate: "2018-05-31",
        paid: true,
        treatmentCodes: [41524, 9810, 33179]
      }]).replace(/\s/g, '')).toEqual(
      `>PI-31415
      +2018-05-31|Y|41524,9810,33179`
      .replace(/\s/g, '')
    )

    expect(serialize([{
      patientId: "RQ-15509",
      visitDate: "2018-06-09",
      paid: false,
      treatmentCodes: [2251]
    }]).replace(/\s/g, '')).toEqual(
    `>RQ-15509
    +2018-06-09|N|2251`
    .replace(/\s/g, '')
  )
  });
});

describe("Deserialization", () => {
  test("should deserialize patient data", () => {
    expect(deserialize(`>RQ-15509
    +2018-06-09|N|2251`.replace(/[^\S\r\n]+/g, ''))).toEqual(
      [{
        patientId: "RQ-15509",
        visitDate: "2018-06-09",
        paid: false,
        treatmentCodes: [2251]
      }]
    )
  });
});

describe("Serialization", () => {
  test("should serialize given patient data in task", () => {
    expect(serialize([{
      patientId: "PI-31415",
      visitDate: "2018-06-09",
      paid: true,
      treatmentCodes: [41524, 9810, 33179]
    },
    {
      patientId: "RQ-15509",
      visitDate: "2018-05-31",
      paid: false,
      treatmentCodes: [2251]
    },
    {
      patientId: "PI-31415",
      visitDate: "2018-06-04",
      paid: false,
      treatmentCodes: []
    }]
    ).replace(/\s/g, '')).toEqual(
      `>PI-31415
      +2018-06-04|N|
      +2018-06-09|Y|41524,9810,33179
      >RQ-15509
      +2018-05-31|N|2251
      `
      .replace(/\s/g, '')
    )
  });
});
