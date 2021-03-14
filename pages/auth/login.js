import React from "react";
import { useForm } from "react-hook-form";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import api from "../api";

function Login() {
  const [error, setError] = React.useState("");
  const [is_auth, setIs_auth] = React.useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data, event) => {
    event.preventDefault();

    try {
      await api.auth_api(data);
      setError("");
      setIs_auth(true);

    }
    catch (error) {
      setError(
        "informations is invalid"
      );
      setIs_auth(false);
    }
  };


  return (
    <>
      <Col className="mt-5">
        <Card className="shadow border-0  pt-5 pb-3">
          <CardHeader className="bg-transparent">
            <div className="text-center text-muted mb-4">
              <h4> You are Welcome</h4>
              <h4> Login</h4>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input className="Input"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    ref={register({
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                      }
                    })}
                    className={"form-control" + (error && " is-invalid")}
                  />
                  {errors.email && errors.email.message}
                  {error && <p className="invalid-feedback">{error}</p>}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input className="Input"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    ref={register({
                      required: "Required",
                      pattern: {
                        message: "invalid password"
                      }
                    })}
                    className={"form-control" + (error && " is-invalid")}
                  />
                  {errors.password && errors.password.message}
                  {error && <p className="invalid-feedback">{error}</p>}
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input "
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <button className="my-4" class="btn btn-success" type="submit">
                  Sign in
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Create new account</small> */}
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
