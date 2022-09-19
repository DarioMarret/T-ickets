import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";
// plugin used to create sliders
import Slider from "nouislider";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  ProgressBar,
  Row,
  Col,
} from "react-bootstrap";

// react plugin that creates an input with badges
import TagsInput from "components/TagsInput/TagsInput.js";

function ExtendedForms() {
  const [regularTags, setRegularTags] = React.useState([
    "pizza",
    "pasta",
    "parmesan",
  ]);
  const [filledTags, setFilledTags] = React.useState([
    "pizza",
    "pasta",
    "parmesan",
  ]);
  const [singleSelect, setSingleSelect] = React.useState("");
  const [multipleSelect, setMultipleSelect] = React.useState("");
  const slider1 = React.useRef(null);
  const slider2 = React.useRef(null);
  React.useEffect(() => {
    Slider.create(slider1.current, {
      start: [40],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 100 },
    });
    Slider.create(slider2.current, {
      start: [20, 60],
      connect: [false, true, false],
      step: 1,
      range: { min: 0, max: 100 },
    });
  }, []);
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Body>
            <Container fluid>
              <Row>
                <Col md="4">
                  <h4 className="title">Datetime Picker</h4>
                  <Form.Group>
                    <ReactDatetime
                      inputProps={{
                        className: "form-control",
                        placeholder: "Datetime Picker Here",
                      }}
                    ></ReactDatetime>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <h4 className="title">Date Picker</h4>
                  <Form.Group>
                    <ReactDatetime
                      inputProps={{
                        className: "form-control",
                        placeholder: "Date Picker Here",
                      }}
                      timeFormat={false}
                    ></ReactDatetime>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <h4 className="title">Time Picker</h4>
                  <Form.Group>
                    <ReactDatetime
                      dateFormat={false}
                      inputProps={{
                        className: "form-control",
                        placeholder: "Time Picker Here",
                      }}
                    ></ReactDatetime>
                  </Form.Group>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <Col md="6">
                  <h4 className="title">Switches</h4>
                  <Row>
                    <Col md="4">
                      <p className="category">Default</p>
                      <Form.Check
                        type="switch"
                        id="custom-switch-11"
                        className="mb-1"
                      />
                      <Form.Check
                        type="switch"
                        id="custom-switch-12"
                        defaultChecked
                      />
                    </Col>
                    <Col md="4">
                      <p className="category">Disabled</p>
                      <Form.Check
                        disabled
                        type="switch"
                        id="custom-switch-21"
                        className="mb-1"
                      />
                      <Form.Check
                        disabled
                        type="switch"
                        id="custom-switch-22"
                        defaultChecked
                      />
                      <span className="toggle"></span>
                    </Col>
                    <Col md="4">
                      <p className="category">With Labels</p>
                      <label className="d-flex align-items-center">
                        <Form.Check type="switch" id="custom-switch-31" />
                        <span className="ml-1">Switch me</span>
                      </label>
                      <label className="d-flex align-items-center">
                        <Form.Check
                          type="switch"
                          id="custom-switch-32"
                          defaultChecked
                        />
                        <span className="ml-1">Switch me</span>
                      </label>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <Col md="6">
                  <h4 className="title">Tags</h4>
                  {/* You can change "tag-azure" with with "tag-blue", "tag-green", "tag-orange","tag-red" and you can also add "tag-fill" for having filled tags */}
                  <div id="badge">
                    Regular:{" "}
                    <TagsInput
                      value={regularTags}
                      onChange={(value) => setRegularTags(value)}
                      tagProps={{ className: "react-tagsinput-tag tag-azure" }}
                    />
                    Filled:{" "}
                    <TagsInput
                      value={filledTags}
                      onChange={(value) => setFilledTags(value)}
                      tagProps={{
                        className: "react-tagsinput-tag tag-fill tag-azure",
                      }}
                    />
                  </div>
                </Col>
                <Col md="6">
                  <h4 className="title">Customisable Select</h4>
                  <Row>
                    <Col md="6">
                      <Select
                        className="react-select primary"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        value={singleSelect}
                        onChange={(value) => setSingleSelect(value)}
                        options={[
                          {
                            value: "",
                            label: "Single Option",
                            isDisabled: true,
                          },
                          { value: "2", label: "Foobar" },
                          { value: "3", label: "Is great" },
                        ]}
                        placeholder="Single Select"
                      />
                    </Col>
                    <Col md="6">
                      <Select
                        className="react-select info"
                        classNamePrefix="react-select"
                        placeholder="Choose City"
                        name="multipleSelect"
                        closeMenuOnSelect={false}
                        isMulti
                        value={multipleSelect}
                        onChange={(value) => setMultipleSelect(value)}
                        options={[
                          {
                            value: "",
                            label: " Multiple Options",
                            isDisabled: true,
                          },
                          { value: "2", label: "Paris " },
                          { value: "3", label: "Bucharest" },
                          { value: "4", label: "Rome" },
                          { value: "5", label: "New York" },
                          { value: "6", label: "Miami " },
                          { value: "7", label: "Piatra Neamt" },
                          { value: "8", label: "Paris " },
                          { value: "9", label: "Bucharest" },
                          { value: "10", label: "Rome" },
                          { value: "11", label: "New York" },
                          { value: "12", label: "Miami " },
                          { value: "13", label: "Piatra Neamt" },
                          { value: "14", label: "Paris " },
                          { value: "15", label: "Bucharest" },
                          { value: "16", label: "Rome" },
                          { value: "17", label: "New York" },
                          { value: "18", label: "Miami " },
                          { value: "19", label: "Piatra Neamt" },
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <br></br>
              <Row>
                <Col md="6">
                  <h4 className="title">Progress Bar</h4>
                  <ProgressBar>
                    <ProgressBar max="100" min="0" now="60">
                      <span className="sr-only">60% Complete</span>
                    </ProgressBar>
                  </ProgressBar>
                  <ProgressBar>
                    <ProgressBar max="100" min="0" now="60" variant="info">
                      <span className="sr-only">60% Complete</span>
                    </ProgressBar>
                  </ProgressBar>
                  <ProgressBar>
                    <ProgressBar max="100" min="0" now="35" variant="success">
                      <span className="sr-only">35% Complete (success)</span>
                    </ProgressBar>
                    <ProgressBar max="100" min="0" now="20" variant="warning">
                      <span className="sr-only">20% Complete (warning)</span>
                    </ProgressBar>
                    <ProgressBar max="100" min="0" now="10" variant="danger">
                      <span className="sr-only">10% Complete (danger)</span>
                    </ProgressBar>
                  </ProgressBar>
                </Col>
                <Col md="6">
                  <h4 className="title">Sliders</h4>
                  <div className="slider-info" ref={slider1}></div>
                  <br></br>
                  <div className="slider-success" ref={slider2}></div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        {/* end card */}
      </Container>
    </>
  );
}

export default ExtendedForms;
