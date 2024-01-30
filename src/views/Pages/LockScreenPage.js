import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
  Form
} from "react-bootstrap";

function LockScreenPage() {
  return (
    <>
      <div
        className="full-page lock-page"
        data-color="purple"
        
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Col className="mx-auto" lg="4" md="8">
              <Card className="card-lock text-center card-plain">
                <Card.Header>
                  <div className="author">
                    
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title as="h4">Tania Andrew</Card.Title>
                  <Form.Group>
                    <Form.Control
                      placeholder="Enter Password"
                      type="password"
                    ></Form.Control>
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="btn-round"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="info"
                  >
                    Unlock
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Container>
        </div>

        
      </div>
    </>
  );
}

export default LockScreenPage;
