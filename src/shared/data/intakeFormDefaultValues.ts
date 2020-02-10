export const defaultParentValues = {
  firstName: {
    value: '',
    required: true,
    error: '',
  },
  lastName: {
    value: '',
    required: true,
    error: '',
  },
  gender: {
    value: '',
    required: true,
    error: '',
  },
  phoneNumber: {
    value: '',
    required: true,
    error: '',
  },
  email: {
    value: '',
    required: true,
    error: '',
  },
  address: {
    street: {
      value: '',
      required: true,
      error: '',
    },
    city: {
      value: '',
      required: true,
      error: '',
    },
    state: {
      value: '',
      required: true,
      error: '',
    },
    zip: {
      value: '',
      required: true,
      error: '',
    },
  },
  isInSameHousehold: {
    value: false,
    required: true,
    error: '',
  },
  dob: {
    value: '',
    required: true,
    error: '',
  },
};

export const defaultInsuranceValues = {
  idNumber: {
    value: '',
    required: true,
    error: '',
  },
  groupNumber: {
    value: '',
    required: true,
    error: '',
  },
  provider: {
    value: '',
    required: true,
    error: '',
  },
  insured: {
    value: '',
    required: true,
    error: '',
  },
};

export const defaultFormValues = {
  date: {
    value: '',
    required: true,
    error: '',
  },
  servicesRequested: {
    value: [],
    required: true,
    error: '',
  },
  client: {
    firstName: {
      value: '',
      required: true,
      error: '',
    },
    lastName: {
      value: '',
      required: true,
      error: '',
    },
    dob: {
      value: '',
      required: true,
      error: '',
    },
    gender: {
      value: '',
      required: true,
      error: '',
    },
    otherGender: {
      value: '',
      required: false,
      error: '',
    },
    school: {
      value: '',
      required: true,
      error: '',
    },
    grade: {
      value: '',
      required: true,
      error: '',
    },
  },
  parents: {
    value: [defaultParentValues],
    required: true,
    error: '',
  },
  physician: {
    firstName: {
      value: '',
      required: true,
      error: '',
    },
    lastName: {
      value: '',
      required: true,
      error: '',
    },
    practice: {
      value: '',
      required: true,
      error: '',
    },
    phoneNumber: {
      value: '',
      required: true,
      error: '',
    },
  },
  insurances: {
    value: [],
    required: true,
    error: '',
  },
};

export const defaultIntakeQuestionValues = {
  creditCardInfoSaved: {
    value: false,
    required: true,
    error: '',
  },
  ratesDiscussed: {
    value: false,
    required: true,
    error: '',
  },
  preferredTimes: {
    value: '',
    required: true,
    error: '',
  },
  needs: {
    value: '',
    required: true,
    error: '',
  },
  hasReferral: {
    value: false,
    required: false,
    error: '',
  },
  referral: {
    firstName: {
      value: '',
      required: false,
      error: '',
    },
    lastName: {
      value: '',
      required: false,
      error: '',
    },
  },
  referralConcernMatch: {
    value: '',
    required: false,
    error: '',
  },
  diagnosis: {
    name: {
      value: '',
      required: true,
      error: '',
    },
    provider: {
      value: '',
      required: true,
      error: '',
    },
    date: {
      value: '',
      required: true,
      error: '',
    },
    comments: {
      value: '',
      required: true,
      error: '',
    },
  },
  concerns: {
    areas: {
      value: '',
      required: true,
      error: '',
    },
    communication: {
      value: '',
      required: true,
      error: '',
    },
    motor: {
      value: '',
      required: true,
      error: '',
    },
    sensory: {
      value: '',
      required: true,
      error: '',
    },
    cognitive: {
      value: '',
      required: true,
      error: '',
    },
  },
  priorTherapy: {
    value: '',
    required: true,
    error: '',
  },
  schoolSupport: {
    value: '',
    required: true,
    error: '',
  },
  priorTreatments: {
    value: '',
    required: true,
    error: '',
  },
};
