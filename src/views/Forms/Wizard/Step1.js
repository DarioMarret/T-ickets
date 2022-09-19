import React from "react";
import { Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";

const Step1 = React.forwardRef((props, ref) => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const isValidated = () => {
    console.log("hey");
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(email) === false
      ? setEmailError(
          <small className="text-danger">
            Email is required and format should be <i>john@doe.com</i>.
          </small>
        )
      : setEmailError(null);
    return re.test(email);
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      console.log("hey from use");
      return isValidated();
    },
  }));
  return (
    <div className="wizard-step" ref={ref}>
      <p className="text-center">Please tell us more about yourself.</p>
      <Row>
        <Col md={{ span: 5, offset: 1 }}>
          <FormGroup>
            <FormLabel>First Name</FormLabel>
            <FormControl type="text" name="first_name" placeholder="ex: Mike" />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <FormControl
              type="text"
              name="last_name"
              placeholder="ex: Andrew"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              Email <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="email"
              name="email"
              placeholder="ex: hello@creative-tim.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError}
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step1;
