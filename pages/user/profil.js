import User from "layouts/User.js";
import dynamic from "next/dynamic";
const ProfilHeader = dynamic(() =>
  import("../../components/Headers/ProfilHeader")
);
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

const UserPanel = () => {
  return (
    <>
      <ProfilHeader />
      <Container>
        <Row className="mt-3 mb-3">
          <Col>
            <Form>
              <FormGroup >
                <Label for="exampleText">Who am I ?</Label>
                <Input type="textarea" name="text" id="exampleText" rows="7"/>
              </FormGroup>
              <FormGroup>
                <FormText color="muted">
                  Information only visible to you and the inspire crew
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Phone Number:</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phoneNumber"
                  placeholder=""
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Day rate:</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder=""
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="startAt">I Start at:</Label>
                    <Input
                      type="text"
                      name="startAt"
                      id="startAt"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="finishAt">I finish at:</Label>
                    <Input
                      type="text"
                      name="finishAt"
                      id="finishAt"
                      placeholder=""
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Button>Save</Button>
            </Form>
          </Col>
          <Col>
            <div className="mt-5">
            <h1>Block to be Upload video here...</h1>
            </div>
            <div className="mt-7">
                <p>Dear inspirnaute, to start out, you can, if you wish record a video to explain in <b>30 seconds</b>
                your background, who you are, what you like and what you expect from your next mission.</p>
            </div>
            <div>
                <p>
                    Usually, videos generate excitement with our customers and increase your visibility. So
                     <b>prepare your best smile and good lighting, and it's up to you!</b>
                     (Don't worry, you can repart the video as many times as you want).
                </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

UserPanel.layout = User;

export default UserPanel;
