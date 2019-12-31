import React, { FunctionComponent } from 'react';

type IntakeFormProps = {};

const IntakeForm: FunctionComponent<IntakeFormProps> = (
  props: IntakeFormProps
) => {
  console.log(props);
  return (
    <div className="intake-form">
      <h1>Hello</h1>
    </div>
  );
};

export default IntakeForm;
