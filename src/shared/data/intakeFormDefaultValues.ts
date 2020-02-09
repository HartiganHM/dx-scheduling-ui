export const defaultParentValues = {
  firstName: {
    value: '',
    required: true,
  },
  lastName: {
    value: '',
    required: true,
  },
  gender: {
    value: '',
    required: true,
  },
  phoneNumber: {
    value: '',
    required: true,
  },
  email: {
    value: '',
    required: true,
  },
  address: {
    street: {
      value: '',
      required: true,
    },
    city: {
      value: '',
      required: true,
    },
    state: {
      value: '',
      required: true,
    },
    zip: {
      value: '',
      required: true,
    },
  },
  isInSameHousehold: {
    value: false,
    required: true,
  },
  dob: {
    value: '',
    required: true,
  },
};

export const defaultInsuranceValues = {
  idNumber: {
    value: '',
    required: true,
  },
  groupNumber: {
    value: '',
    required: true,
  },
  provider: {
    value: '',
    required: true,
  },
  insured: {
    value: '',
    required: true,
  },
};

export const defaultFormValues = {
  date: {
    value: '',
    required: true,
  },
  servicesRequested: {
    value: [],
    required: true,
  },
  client: {
    firstName: {
      value: '',
      required: true,
    },
    lastName: {
      value: '',
      required: true,
    },
    dob: {
      value: '',
      required: true,
    },
    gender: {
      value: '',
      required: true,
    },
    otherGender: {
      value: '',
      required: false,
    },
    school: {
      value: '',
      required: true,
    },
    grade: {
      value: '',
      required: true,
    },
  },
  parents: {
    value: [defaultParentValues],
    required: true,
  },
  physician: {
    firstName: {
      value: '',
      required: true,
    },
    lastName: {
      value: '',
      required: true,
    },
    practice: {
      value: '',
      required: true,
    },
    phoneNumber: {
      value: '',
      required: true,
    },
  },
  insurances: {
    value: [],
    required: true,
  },
};

export const defaultIntakeQuestionValues = {
  creditCardInfoSaved: {
    value: false,
    required: true,
  },
  ratesDiscussed: {
    value: false,
    required: true,
  },
  preferredTimes: {
    value: '',
    required: true,
  },
  needs: {
    value: '',
    required: true,
  },
  hasReferral: {
    value: false,
    required: true,
  },
  referral: {
    firstName: {
      value: '',
      required: true,
    },
    lastName: {
      value: '',
      required: true,
    },
  },
  referralConcernMatch: {
    value: '',
    required: true,
  },
  diagnosis: {
    name: {
      value: '',
      required: true,
    },
    provider: {
      value: '',
      required: true,
    },
    date: {
      value: '',
      required: true,
    },
    comments: {
      value: '',
      required: true,
    },
  },
  concerns: {
    areas: {
      value: '',
      required: true,
    },
    communication: {
      value: '',
      required: true,
    },
    motor: {
      value: '',
      required: true,
    },
    sensory: {
      value: '',
      required: true,
    },
    cognitive: {
      value: '',
      required: true,
    },
  },
  priorTherapy: {
    value: '',
    required: true,
  },
  schoolSupport: {
    value: '',
    required: true,
  },
  priorTreatments: {
    value: '',
    required: true,
  },
};
