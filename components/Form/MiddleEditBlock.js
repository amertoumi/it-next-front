import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import { Row, Col, Button } from "reactstrap";
import Link from 'next/link';
const form_id = "form_id";

class MaintenanceForm extends Component {

  editOnClick = (event) => {
    event.preventDefault();
    const data = !this?.props?.status?.edit;
    this.props.setStatus({
      edit: data,
    });
  };

  cancelOnClick = (event) => {
    event.preventDefault();
    this.props.resetForm();
    this.props.setStatus({
      edit: false,
    });
  };

  _renderAction() {
    return (
      <React.Fragment>
        <div className="form-statusbar mb-3">
          {this?.props?.status?.edit ? (
            <React.Fragment>
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                form={form_id}
              >
                Save
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            
            <Row className="d-flex justify-content-between">
                <Col>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={this.editOnClick}
                >Edit</button>
                </Col>
                <Col>
                <Link href="/user/cv">
                <button className="btn btn-success btn-sm">View Resume</button>
                </Link>
                </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
  }

  _renderFormView = () => {
    return (
      <React.Fragment>
        <Row>
          <Col className="">
            <div className="form-group row">
              <div>
                <label className=" col-form-label pl-4">Name and Last Name</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="name" className="form-control">
                  {this?.props?.fields?.name}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Current Position</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="poste" className="form-control" >
                  {this?.props?.fields?.poste}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Number of years of flight</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="years" className="form-control">
                  {this?.props?.fields?.years}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Landing Place</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="address" className="form-control">
                  {this?.props?.fields?.address}
                </label>
              </div>
            </div>
          </Col>
          <Col className="">
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Phone Number</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="phoneNumber" className="form-control">
                  {this?.props?.fields?.phoneNumber}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Email</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="email" className="form-control">
                  {this?.props?.fields?.email}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div>
                <label className="col-form-label pl-4">Link</label>
              </div>
              <div className="col-sm-10">
                <label type="text" name="link" className="form-control">
                  {this?.props?.fields?.link}
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  _renderFormInput = () => {
    return (
      <React.Fragment>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name and Last Name</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Current Position</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="poste"
              className="form-control"
              placeholder="Your Poste"
             
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Number of years of flight</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="years"
              className="form-control"
              placeholder="number of years of experience"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Landing Place</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="address"
              className="form-control"
              placeholder="your address"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Phone Number</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="your phone number"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Link</label>
          <div className="col-sm-10">
            <Field
              type="text"
              name="link"
              className="form-control"
              placeholder="Link"
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        {/* <h2>Formik Form</h2> */}
        {this._renderAction()}
        <Form id={form_id}>
          {this?.props?.status?.edit
            ? this._renderFormInput()
            : this._renderFormView()}
        </Form>
        <h4>Current value</h4>
        <div>const form_id = "form_id";
          <pre>
            <code>{JSON.stringify(this.props.fields, null, 2)}</code>
          </pre>
        </div> 
      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToStatus: (props) => {
    return {
      edit: props?.edit || false,
    };
  },
  mapPropsToValues: (props) => {
    return {
      name: props.fields.name,
      email: props.fields.email,
      phoneNumber: props.fields.phoneNumber,
      address: props.fields.address,
      poste: props.fields.poste,
      link: props.fields.link,
      years: props.fields.years
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, ...actions }) => {
    props.updateFields(values);
    actions.setStatus({
      edit: false,
    });
  },
})(MaintenanceForm);

export default FormikForm;
