export default {
  clientInputs: {
    genderOptions: ['Female', 'Male', 'Prefer not to say', 'Other'],
    headings: {
      client: 'Client',
      general: 'General Information',
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
  diagnosisInputs: {
    heading: 'Diagnosis',
    labels: {
      comments: 'Comments',
      date: 'Date',
      name: 'Name',
      provider: 'Provider',
    },
  },
  generalQuestions: {
    heading: 'GeneralQuestions',
    labels: {
      creditCardInfoSaved: 'Payment information saved?',
      hasReferral: 'Were you referred to us?',
      needs:
        'What will be helpful to your child or your family as a result of this evaluation and/or therapy?',
      preferredTimes: 'Preferred times for therapy or first available?',
      priorTherapy: 'Other Therapy Received? Private or in School?',
      priorTreatments:
        'What other treatments now or in the past have you tried?',
      ratesDiscussed: 'Rates discussed?',
      schoolSupport:
        'Are you happy with the support your child gets from school?',
    },
  },
  insuranceInputs: {
    heading: 'Insurance',
    labels: {
      dob: 'Insured DOB',
      groupNumber: 'Group #',
      idNumber: 'ID #',
      insured: 'Insured',
      providers: 'Providers',
    },
    providers: ['Kaiser', 'Medicaid', 'United', 'Other'],
  },
  parentInputs: {
    buttons: {
      delete: 'Delete',
    },
    headings: {
      address: 'Address',
      contact: 'Contact',
      name: (number: number): string => `Parent/Guardian ${number}`,
    },
    labels: {
      city: 'City',
      email: 'Email',
      firstName: 'First',
      lastName: 'Last',
      phoneNumber: 'Phone Number',
      sameHousehold: 'In same household?',
      state: 'State',
      street: 'Street',
      zip: 'Zip',
    },
  },
  primaryCareProviderInputs: {
    heading: 'Primary Care Provider',
    labels: {
      firstName: 'First',
      lastName: 'Last',
      phoneNumber: 'Phone Number',
      practice: 'Practice',
    },
  },
  referralInputs: {
    heading: 'Referral',
    labels: {
      firstName: 'First',
      lastName: 'Last',
      referralConcernMatch:
        'Do your concerns match the concerns of the person who referred you?',
    },
  },
  errorMessages: {
    areas: 'Please address this question or enter N/A',
    city: 'Please enter a city',
    cognitive: 'Please address this question or enter N/A',
    comments: 'Please enter any comments or N/A',
    communication: 'Please address this question or enter N/A',
    creditCardInfoSaved: 'Please confirm',
    date: 'Please enter a date',
    dob: 'Please enter a date of birth',
    email: 'Please enter an email',
    firstName: 'Please enter a first name',
    gender: 'Please select a gender',
    grade: 'Please enter a grade',
    groupNumber: 'Please enter an insurance group number',
    idNumber: 'Please enter an insurance ID number',
    insurances: 'Please select at least one insurance provider',
    insured: 'Please select an insured parent/guardian',
    lastName: 'Please enter a last name',
    motor: 'Please address this question or enter N/A',
    name: 'Please enter a physician name',
    needs: 'Please address this question',
    phoneNumber: 'Please enter a phone number',
    practice: 'Please enter a practice',
    preferredTimes: 'Please enter preferred times',
    priorTherapy: 'Please address this question',
    priorTreatments: 'Please address this question',
    provider: 'Please enter a provider',
    ratesDiscussed: 'Please confirm',
    referralConcernMatch: 'Please address this question',
    school: 'Please enter a school',
    schoolSupport: 'Please address this question',
    sensory: 'Please address this question or enter N/A',
    servicesRequested: 'Please select at least one service',
    state: 'Please enter a state',
    street: 'Please enter a street address',
    zip: 'Please enter a zip code',
  },
};
