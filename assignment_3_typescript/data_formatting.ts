interface PatientVisit {
  patientId: string;
  visitDate: string;
  paid: boolean;
  treatmentCodes?: Array<number>;
}
  
const patientData: Array<PatientVisit> = [
  {
    patientId: "RQ-15509",
    visitDate: "2018-05-31",
    paid: false,
    treatmentCodes: [2251],
  },
  {
    patientId: "PI-31415",
    visitDate: "2018-06-09",
    paid: true,
    treatmentCodes: [41524, 9810, 33179],
  },
  {
    patientId: "PI-31415",
    visitDate: "2018-06-04",
    paid: false,
    treatmentCodes: [],
  },
  {
    patientId: "RQ-15509",
    visitDate: "2018-06-31",
    paid: true,
  },

  {
    patientId: "AM-15508",
    visitDate: "2014-06-31",
    paid: false,
    treatmentCodes: [],
  },
  {
    patientId: "RQ-15510",
    visitDate: "2012-06-31",
    paid: false,
    treatmentCodes: [41524],
  },
  {
    patientId: "AM-15508",
    visitDate: "2012-06-31",
    paid: false,
    treatmentCodes: [41524],
  },
  {
    patientId: "AM-15508",
    visitDate: "2016-04-31",
    paid: false,
  },
];

function sortVisits( visit1: PatientVisit, visit2: PatientVisit ) {
  if (visit1.patientId > visit2.patientId) { return 1; }
    else if (visit1.patientId < visit2.patientId) { return -1; }
    else {
        if (visit1.visitDate > visit2.visitDate) {return 1; }
        else if (visit1.visitDate < visit2.visitDate) {return -1; }
        else { return 0; }
    }
}


function serialize(visits: Array<PatientVisit>): string {
  let result = ''
  const sortedVisits = visits.sort(sortVisits)
  let lastPatientId: null | string = null
  for (let visit of sortedVisits) {
    if (lastPatientId !== visit.patientId) {
      result = `${result}\n>${visit.patientId}`
      lastPatientId = visit.patientId
    }
    result = `${result}\n+${visit.visitDate}|${visit.paid ? 'Y': 'N'}|${visit.treatmentCodes?.length ? visit.treatmentCodes?.join(','): ''}`
  }
  return result
}

function deserialize(serializedVisit: string): Array<PatientVisit> {
  const result: Array<PatientVisit> = []
  const lines = serializedVisit.split('\n')
  let patientId = ''
  for (let line of lines) {
    if (line.startsWith('>')) {
      patientId = line.substring(1)
    } else if (line.startsWith('+')) {

      let treatmentCodes: Array<number>
      let visitDate: string
      let paid: boolean

      const data = line.substring(1).split('|')
      visitDate = data[0]

      if (data[2]) {
        treatmentCodes = data[2].split(',').map((code) => {
          return +code
        })
      } else {
        treatmentCodes = []
      }

      paid = data[1] === 'N' ? false : true
      result.push({
        patientId,
        paid,
        visitDate,
        treatmentCodes
      })
    }
  }
  return result
}

export {
  patientData,
  serialize,
  deserialize
}
