export default {
  clientInputs: {
    genderOptions: ['Female', 'Male', 'Prefer not to say', 'Other'],
    headings: {
      client: 'Client',
    },
    labels: {
      dob: 'DOB',
      firstName: 'First',
      gender: 'Gender',
      grade: 'Grade',
      lastName: 'Last',
      school: 'School Name',
    },
  },
  intakeForm: {
    buttons: {
      addParent: 'Add Parent/Guardian',
      submit: 'Submit',
    },
    icons: {
      addParent: 'add_circle_outline',
    },
    labels: {
      date: 'Date',
      servicesRequested: 'Services Requested',
    },
    services: [
      'Psych Evaluation',
      'Psych Therapy',
      'OT Evaluation',
      'OT Treatment',
      'ST Evaluation',
      'ST Treatment',
    ],
  },
  concernInputs: {
    heading: 'Concerns',
    labels: {
      areasOfConcern:
        "What do you think is the cause of your child's difficulties?",
      cognitiveConcerns: 'Any cognitive concerns?',
      communicationConcerns: 'Any communication concerns?',
      motorConcerns: 'Any motor concerns?',
      sensoryConcerns: 'Any sensory concerns?',
    },
  },
  intakeQuestions: {
    headingConcerns: 'Concerns',
    headingDiagnosis: 'Diagnosis',
    headingGeneralQuestions: 'GeneralQuestions',
    headingReferral: 'Referral',
    labelCreditCardInfoSaved: 'Payment information saved?',
    labelDiagnosisComments: 'Comments',
    labelHasReferral: 'Were you referred to us?',
    labelNeeds:
      'What will be helpful to your child or your family as a result of this evaluation and/or therapy?',
    labelPreferredTimes: 'Preferred times for therapy or first available?',
    labelRatesDiscussed: 'Rates discussed?',
    labelReferralConcernMatch:
      'Do your concerns match the concerns of the person who referred you?',
  },
};
