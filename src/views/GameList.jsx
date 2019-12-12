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
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";

import  Card  from "components/Card/Card.jsx";
import  StandardDropdown  from "components/AcadEntity/StandardDropdown";
import  ChapterDropdown  from "components/AcadEntity/ChapterDropdown";
import  GameTable  from "components/AcadEntity/GameTable";
import QuestionTable from "components/AcadEntity/QuestionTable";

import Button from "components/CustomButton/CustomButton.jsx";


class GameList extends Component {
  render() {
    return (!this.props.user.loggedIn)? (
      <Redirect to="/auth/login-page" />
          ) : (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                  <Row>
                    <Col md={9}>
                      <FormGroup controlId="formControlsTextarea">
                        <div className="col-md-3">
                          <ControlLabel>Standard: </ControlLabel>
                        </div>
                        <div className="col-md-5">
                          <StandardDropdown />
                        </div>
                        <div className="col-md-3">
                          <Button bsStyle="info" fill>
                            Submit Standard
                          </Button>
                        </div>
                        
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <FormGroup controlId="formControlsTextarea">
                        <div className="col-md-3">
                          <ControlLabel>Chapter: </ControlLabel>
                        </div>
                        <div className="col-md-5">
                          <ChapterDropdown />
                        </div>
                        <div className="col-md-3">
                          <Button bsStyle="info" fill type="submit">
                            Submit Chapter
                          </Button>
                        </div>
                        
                      </FormGroup>
                    </Col>
                  </Row>

                    <Row>
                      <Col md={12}>
                      <GameTable />
                      </Col>
                    </Row>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={6}>
            <Row>
            <div className="card card-user">
              <div className="content">
                <p className="description text-center">
                  <ControlLabel>Selected Standard:</ControlLabel>
                  <h5 className="title">Standard_1</h5>
                </p>
                <p className="description text-center">
                  <ControlLabel>Selected Chapter:</ControlLabel>
                  <h5 className="title">Chapter_1</h5>
                </p>
                <p className="description text-center">
                  <ControlLabel>Selected Game:</ControlLabel>
                  <h5 className="title">Game_1</h5>
                </p>
                <p className="description text-center">
                  <ControlLabel>Question Count:</ControlLabel>
                  <h5 className="title">40</h5>
                </p>
              </div>
              <hr />
            </div>
            </Row>
            <Row>
            <div className="card card-user">
            <QuestionTable />
                  </div>
                    </Row>
            </Col>
          </Row>
          
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  };
};
export default connect(mapStateToProps, null) (GameList);
