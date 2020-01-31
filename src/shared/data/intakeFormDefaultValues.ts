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

export const defaultIntakeQuestionValues = {
  creditCardInfoSaved: false,
  ratesDiscussed: false,
  preferredTimes: '',
  needs: '',
  hasReferral: false,
  referral: {
    firstName: '',
    lastName: '',
  },
  referralConcernMatch: '',
  diagnosis: {
    name: '',
    provider: '',
    date: '',
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
