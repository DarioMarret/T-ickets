import React from "react";
import { Row, Col, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// react component that creates a dropdown menu for selection
import Select from "react-select";

const Step2 = React.forwardRef((props, ref) => {
  const [website, setWebsite] = React.useState("");
  const [websiteError, setWebsiteError] = React.useState(null);
  const [languageSelect, setLanguageSelect] = React.useState(null);
  const [languageError, setLanguageError] = React.useState(null);
  const [bootstrapVersion, setBootstrapVersion] = React.useState("");
  const isValidated = () => {
    var wb;
    try {
      new URL(website);
      setWebsiteError(null);
      wb = true;
    } catch (_) {
      setWebsiteError(
        <small className="text-danger">Must be a valid URL!</small>
      );
      wb = false;
    }
    languageSelect === null
      ? setLanguageError(
          <small className="text-danger">You have to select a language.</small>
        )
      : setLanguageError(null);
    var lg = languageSelect !== null;
    var valid = wb && lg;
    return valid;
  };
  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
  }));
  return (
    <div className="wizard-step">
      <p className="text-center mt-4">
        Please give us more details about your platform.
      </p>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <FormGroup>
            <FormLabel>
              Your Website <span className="text-danger">*</span>
            </FormLabel>
            <FormControl
              type="text"
              name="website"
              placeholder="ex: https://www.creative-tim.com"
              onChange={(event) => setWebsite(event.target.value)}
            />
            {websiteError}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 1 }}>
          <FormGroup>
            <FormLabel>Framework Type</FormLabel>
            <FormControl
              type="text"
              name="framework"
              placeholder="ex: https://www.creative-tim.com"
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>
              Language <span className="text-danger">*</span>
            </FormLabel>
            <Select
              name="languageSelect"
              value={languageSelect}
              options={[
                { value: "id", label: "Bahasa Indonesia" },
                { value: "ms", label: "Bahasa Melayu" },
                { value: "ca", label: "Català" },
                { value: "da", label: "Dansk" },
                { value: "de", label: "Deutsch" },
                { value: "en", label: "English" },
                { value: "es", label: "Español" },
                { value: "el", label: "Eλληνικά" },
                { value: "fr", label: "Français" },
                { value: "it", label: "Italiano" },
                { value: "hu", label: "Magyar" },
                { value: "nl", label: "Nederlands" },
                { value: "no", label: "Norsk" },
                { value: "pl", label: "Polski" },
                { value: "pt", label: "Português" },
                { value: "fi", label: "Suomi" },
                { value: "sv", label: "Svenska" },
                { value: "tr", label: "Türkçe" },
                { value: "is", label: "Íslenska" },
                { value: "cs", label: "Čeština" },
                { value: "ru", label: "Русский" },
                { value: "th", label: "ภาษาไทย" },
                { value: "zh", label: "中文 (简体)" },
                { value: "zh-TW", label: "中文 (繁體)" },
                { value: "ja", label: "日本語" },
                { value: "ko", label: "한국어" },
              ]}
              palceholder="- language -"
              onChange={(value) => setLanguageSelect(value)}
            />
            {languageError}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 1 }}>
          <FormGroup>
            <FormLabel>Bootstrap version</FormLabel>
            <Select
              name="bootstrapSelect"
              value={bootstrapVersion}
              options={[
                { value: 1, label: "Bootstrap 1.1" },
                { value: 2, label: "Bootstrap 2.0" },
                { value: 3, label: "Bootstrap 3.0" },
                { value: 4, label: "Bootstrap 4.0(beta)" },
              ]}
              onChange={(value) => setBootstrapVersion(value)}
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <FormLabel>Price</FormLabel>
            <FormControl type="number" name="price" placeholder="ex: 19.00" />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
});

export default Step2;
