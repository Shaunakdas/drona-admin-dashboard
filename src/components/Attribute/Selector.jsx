/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";

class InputText extends Component {
  render() {
    return (
      <Row>
        <Col md={6}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>
              {this.props.title}
            </ControlLabel>
            <Checkbox
              isChecked={this.props.isChecked}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <ControlLabel>Final {this.props.title}</ControlLabel>
          <h5 className="title">What</h5>
        </Col>
      </Row>
    );
  }
}

export default InputText;
