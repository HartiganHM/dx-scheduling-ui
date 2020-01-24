export const defaultParentValues = {
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  isInSameHousehold: false,
  dob: '',
};

export const defaultInsuranceValues = {
  id: '',
  groupNumber: '',
  provider: '',
  insured: '',
};

export const defaultFormValues = {
  date: '',
  servicesRequested: [],
  client: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    school: '',
    grade: '',
  },
  parents: [defaultParentValues],
  sameHousehold: undefined,
  physician: {
    firstName: '',
    lastName: '',
    practice: '',
    phoneNumber: '',
  },
  insurances: [],
};

export const defaultChecklistValues = {
  creditCardInfoSaved: false,
  ratesDiscussed: false,
  preferredTimes: '',
  needs: '',
  referral: '',
  referralConcernMatch: '',
  diagnosis: {
    name: '',
    date: '',
    provider: '',
    comments: '',
  },
  concerns: {
    areas: '',
    communication: '',
    motor: '',
    sensory: '',
    cognitive: '',
  },
  priorTherapy: '',
  schoolSupport: '',
  priorTreatments: '',
};
