/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";

import { performLogin } from '../../store/user/actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true,
      email: '',
      password: '',
      errorMsg: ''
    };
  }
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }


  handleSubmit(event) {
    // event.preventDefault();
    this.props.performLogin({
      email: this.state.email,
      password: this.state.password
    });
  }
  handleClick(event) {
    // event.preventDefault();
    this.props.performLogin({
      email: this.state.email,
      password: this.state.password
    });
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form onSubmit={this.handleSubmit}>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                    <FormGroup>
                      <ControlLabel>Email address</ControlLabel>
                      <FormControl
                        placeholder="Enter email" 
                        type="email"
                        onChange={e => this.setState({email: (e.target.value)})}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        onChange={e => this.setState({password: (e.target.value)})}
                      />
                    </FormGroup>
                    {
                      (this.props.user.errorMsg.length > 0)? 
                      <p> {this.props.user.errorMsg}</p> : null
                    }
                    
                  </div>
                }
                
                legend={
                  <Button bsStyle="info" fill wd
                    disabled={!this.validateForm()}
                    onClick={(event) => this.handleClick(event)}>
                    Login
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    performLogin: ({email,password}) => dispatch(performLogin({email,password}))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
