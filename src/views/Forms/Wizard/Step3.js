import React, { Component } from "react";

const Step3 = React.forwardRef((props, ref) => {
  const [alertState, setAlertState] = React.useState(false);
  const isValidated = () => {
    return true;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
  }));
  return (
    <div className="wizard-step">
      <h2 className="text-center text-space">
        Yuhuuu!
        <br />
        <small>
          {" "}
          Click on "<b>Finish</b>" to join our community
        </small>
      </h2>
    </div>
  );
});

export default Step3;
